import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ContextProps, ScrollContext} from './Context';
import HorizontalScroll from './HorizontalScroll';
import HorizontalScrollLogic from './HorizontalScrollLogic';
import VerticalScrollLogic from './VerticalScrollLogic';
import VerticalScroll from './VerticalScroll';

const DEFAULT_SCROLL_VALUES = {
  XY:{
    thumbThickness:6,
    thumbColor:'white',
    thumbOpacity:0.5,
    trackPadding:0,
    trackColor:'transparent',
    trackBorder:`0px`,
    scrollBorderRadius:`0px`,
    onHoverOnly:false,
  },
}

export interface ScrollProps {
  thumbThickness?:number,
  thumbColor?:string,
  thumbOpacity?:number,
  trackPadding?:number,
  trackColor?:string,
  trackBorder?:string,
  scrollBorderRadius?:string,
  onHoverOnly?:boolean,
}

interface Props{
  children: React.ReactNode;
  className?: string;
  dependencies?:any[]|null,
  scrollY?:ScrollProps,
  scrollX?:ScrollProps,
  onClick?:() => any
}

export default function ScrollableDiv ({
  children,
  className='',
  dependencies=null,
  scrollY,
  scrollX,
  onClick: onClickHandler=()=>{}
}:Props) {

  const scroll = useMemo(() => {
    const X = (scrollX===undefined)?DEFAULT_SCROLL_VALUES.XY:{...DEFAULT_SCROLL_VALUES.XY, ...scrollX};
    const Y = (scrollY===undefined)?DEFAULT_SCROLL_VALUES.XY:{...DEFAULT_SCROLL_VALUES.XY, ...scrollY};
    return {X,Y};
  },[scrollY,scrollX]);
  
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const [isVerticalDragging, setVerticalDragging] = useState(false);
  const [verticalScrollThumbStart, setVerticalScrollThumbStart] = useState(0);
  const [showVerticalScrollBar, setShowVerticalScrollBar] = useState(false);
  const [verticalScrollBasePoint, setVerticalScrollBasePoint] = useState<number|undefined>();
  const [verticalScrollThumbLength, setVerticalScrollThumbLength] = useState(0);
  const [verticalScrollOffset,setVerticalScrollOffset] = useState(0);

  const [isHorizontalDragging, setHorizontalDragging] = useState(false);
  const [horizontalScrollThumbStart, setHorizontalScrollThumbStart] = useState(0);
  const [showHorizontalScrollBar, setShowHorizontalScrollBar] = useState(false);
  const [horizontalScrollBasePoint, setHorizontalScrollBasePoint] = useState<number|undefined>();
  const [horizontalScrollThumbLength, setHorizontalScrollThumbLength] = useState(0);
  const [horizontalScrollOffset,setHorizontalScrollOffset] = useState(0);
  
  const [isHoveringOnContainer,setHoveringOnContainer] = useState(false);

  const contextValues:ContextProps = {
    scroll,scrollableDivRef,
    isHoveringOnContainer,setHoveringOnContainer,

    isVerticalDragging, setVerticalDragging,
    showVerticalScrollBar,setShowVerticalScrollBar,
    verticalScrollThumbStart,setVerticalScrollThumbStart,
    verticalScrollThumbLength,setVerticalScrollThumbLength,
    verticalScrollOffset,setVerticalScrollOffset,
    verticalScrollBasePoint,setVerticalScrollBasePoint,
    
    isHorizontalDragging, setHorizontalDragging,
    showHorizontalScrollBar,setShowHorizontalScrollBar,
    horizontalScrollThumbStart,setHorizontalScrollThumbStart,
    horizontalScrollThumbLength,setHorizontalScrollThumbLength,
    horizontalScrollOffset,setHorizontalScrollOffset,
    horizontalScrollBasePoint,setHorizontalScrollBasePoint,
  };

  const  {
    horizontalSync,
    calcHorizontalThumbSize,
    horizontalScrollMouseDown
  } = HorizontalScrollLogic(contextValues);

  const  {
    verticalSync,
    calcVerticalThumbSize,
    verticalScrollMouseDown
  } = VerticalScrollLogic(contextValues);

  const mouseEnterHandler = useCallback(() => !isHoveringOnContainer && setHoveringOnContainer(true), [isHoveringOnContainer]);
  const mouseLeaveHandler = useCallback(() => isHoveringOnContainer && setHoveringOnContainer(false), [isHoveringOnContainer]);

  const handleScroll = useCallback(() => {
    if (!scrollableDivRef.current) return;
    const scrollableDiv = scrollableDivRef.current;
    const { scrollTop, scrollHeight, offsetHeight } = scrollableDiv;
    const { scrollLeft, scrollWidth, offsetWidth } = scrollableDiv;
    const newTop = (scrollTop / scrollHeight) * offsetHeight;
    const newLeft = (scrollLeft / scrollWidth) * offsetWidth;
    setVerticalScrollThumbStart(newTop);
    setHorizontalScrollThumbStart(newLeft);
  }, [ scrollableDivRef ]);

  const handleDocumentMouseMove = useCallback((event:any) => {
    if (!isVerticalDragging && !isHorizontalDragging) return
    event.preventDefault();
    event.stopPropagation();
    if (isVerticalDragging)return verticalSync( event.clientY+verticalScrollOffset );
    if (isHorizontalDragging)return horizontalSync( event.clientX+horizontalScrollOffset );

  },[ isVerticalDragging, isHorizontalDragging,
      verticalSync, horizontalSync, 
      verticalScrollOffset, horizontalScrollOffset ]);

  const handleDocumentMouseUp = useCallback(event => {
    if (!isVerticalDragging && !isHorizontalDragging)return
    event.preventDefault();
    
    if (isVerticalDragging)return setVerticalDragging(false);
    if (isHorizontalDragging)return setHorizontalDragging(false);

  },[isVerticalDragging, isHorizontalDragging]);

  useEffect(() => {
    if (!scrollableDivRef.current) return;
    const scrollableDiv = scrollableDivRef.current;
    const calculateScrolls = ()=>{
      calcVerticalThumbSize();
      calcHorizontalThumbSize();
      setVerticalScrollBasePoint(undefined);
      setHorizontalScrollBasePoint(undefined);
    }

    calculateScrolls();
    
    window.addEventListener('resize', calculateScrolls);
    scrollableDiv.addEventListener("scroll", handleScroll, true);
    return function cleanup(){
      window.removeEventListener('resize', calculateScrolls)
      scrollableDiv.removeEventListener("scroll", handleScroll, true);
    }

  },[handleScroll,dependencies,children,calcVerticalThumbSize,calcHorizontalThumbSize]);

  useEffect(() => {
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return (
    <div 
      className={className}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      style={{padding:0,border:0,overflow: `hidden`}} 
      onClick={onClickHandler}
    >

      <div className={className} ref={scrollableDivRef} style={{margin:`0`}}>
        {children}
      </div>
      
      <ScrollContext.Provider value={contextValues}>
        <VerticalScroll onMouseDown={verticalScrollMouseDown}/>
        <HorizontalScroll onMouseDown={horizontalScrollMouseDown}/>
      </ScrollContext.Provider>
    </div>
  )
}