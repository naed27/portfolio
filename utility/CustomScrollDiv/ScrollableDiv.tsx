import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ContextProps, HorizontalScrollProps, ScrollContext, VerticalScrollProps} from './Context';
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
    trackBorder:`0px solid transparent`,
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
  onMouseEnter?:() => any
  onMouseLeave?:() => any
  onStartScrollMouseClick?:() => any 
  onEndScrollMouseClick?:() => any
}

export default function ScrollableDiv ({
  children,
  className = '',
  dependencies = null,
  scrollY = DEFAULT_SCROLL_VALUES.XY,
  scrollX = DEFAULT_SCROLL_VALUES.XY,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onStartScrollMouseClick = () => {},
  onEndScrollMouseClick = () => {},
}:Props) {
  
  const scroll = useMemo(() => {
    const X = {...DEFAULT_SCROLL_VALUES.XY, ...scrollX};
    const Y = {...DEFAULT_SCROLL_VALUES.XY, ...scrollY};
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

  const verticalScrollProps:VerticalScrollProps = useMemo(()=>({
    scroll,scrollableDivRef,
    showHorizontalScrollBar,
    verticalScrollThumbLength,
    setVerticalDragging,
    setVerticalScrollOffset,
    setShowVerticalScrollBar,
    setVerticalScrollBasePoint,
    setVerticalScrollThumbLength,
  }),[
    scroll,scrollableDivRef,
    showHorizontalScrollBar,
    verticalScrollThumbLength,
    setVerticalDragging,
    setVerticalScrollOffset,
    setShowVerticalScrollBar,
    setVerticalScrollBasePoint,
    setVerticalScrollThumbLength,
  ]);

  const horizontalScrollProps:HorizontalScrollProps = useMemo(()=>({
    scroll,scrollableDivRef,
    showVerticalScrollBar,
    horizontalScrollThumbLength,
    setHorizontalDragging,
    setHorizontalScrollOffset,
    setShowHorizontalScrollBar,
    setHorizontalScrollBasePoint,
    setHorizontalScrollThumbLength,
  }),[
    scroll,scrollableDivRef,
    showVerticalScrollBar,
    horizontalScrollThumbLength,
    setHorizontalDragging,
    setHorizontalScrollOffset,
    setShowHorizontalScrollBar,
    setHorizontalScrollBasePoint,
    setHorizontalScrollThumbLength,
  ]);

  const contextValues:ContextProps = {
    isHoveringOnContainer,setHoveringOnContainer,
    verticalScrollThumbStart,setVerticalScrollThumbStart,
    isVerticalDragging,verticalScrollOffset,
    isHorizontalDragging,horizontalScrollOffset,
    horizontalScrollThumbStart,setHorizontalScrollThumbStart,
    verticalScrollBasePoint,horizontalScrollBasePoint,
    ...verticalScrollProps,
    ...horizontalScrollProps,
  };

  const  {
    syncScroll:syncScrollHorizontal,
    calculateThumbSize:calculateThumbSizeHorizontal,
    mouseDownOnScroll:mouseDownOnScrollHorizontal,
  } = HorizontalScrollLogic(horizontalScrollProps);

  const horizontalSync = useCallback(syncScrollHorizontal,[syncScrollHorizontal]);
  const calcHorizontalThumbSize = useCallback(calculateThumbSizeHorizontal,[calculateThumbSizeHorizontal]);
  const horizontalScrollMouseDown = useCallback(mouseDownOnScrollHorizontal,[mouseDownOnScrollHorizontal]);

  const  {
    syncScroll:syncScrollVertical,
    calculateThumbSize:calculateThumbSizeVertical,
    mouseDownOnScroll:mouseDownOnScrollVertical,
  } = VerticalScrollLogic(verticalScrollProps);
  
  const verticalSync = useCallback(syncScrollVertical,[syncScrollVertical]);
  const calcVerticalThumbSize = useCallback(calculateThumbSizeVertical,[calculateThumbSizeVertical]);
  const verticalScrollMouseDown = useCallback(mouseDownOnScrollVertical,[mouseDownOnScrollVertical]);

 
  const handleScroll = useCallback((position:string|undefined = 'normal') => {
    if (!scrollableDivRef.current) return;
    const scrollableDiv = scrollableDivRef.current;
    if(position === 'reset')scrollableDiv.scrollTo(0,0)

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
    if (isVerticalDragging)return verticalSync( event.clientY+verticalScrollOffset,verticalScrollBasePoint );
    if (isHorizontalDragging)return horizontalSync( event.clientX+horizontalScrollOffset,horizontalScrollBasePoint );

  },[ isVerticalDragging, 
    isHorizontalDragging,
      verticalSync, 
      horizontalSync, 
      verticalScrollOffset, 
      horizontalScrollOffset,
      verticalScrollBasePoint,
      horizontalScrollBasePoint ]);

  const handleDocumentMouseUp = useCallback(event => {
    if (!isVerticalDragging && !isHorizontalDragging)return
    event.preventDefault();
    
    if (isVerticalDragging){
      !isHoveringOnContainer&&onMouseLeave()
      return setVerticalDragging(false)
    }
    if (isHorizontalDragging){
      !isHoveringOnContainer&&onMouseLeave()
      return setHorizontalDragging(false)
    }
  },[isVerticalDragging, isHorizontalDragging,onMouseLeave,isHoveringOnContainer]);


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
    scrollableDiv.addEventListener('scroll', ()=>{handleScroll()}, true);
    return function cleanup(){
      window.removeEventListener('resize', calculateScrolls)
      scrollableDiv.removeEventListener('scroll', ()=>{handleScroll()}, true);
    }
  },[
    children,
    handleScroll,
    calcVerticalThumbSize,
    calcHorizontalThumbSize,
  ]);

  useEffect(()=>{
    handleScroll('reset');
  },[
    dependencies,
    handleScroll
  ])

  useEffect(() => {
    document.addEventListener('mousemove', handleDocumentMouseMove);
    return function cleanup() {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
    };
  },[
    handleDocumentMouseMove, 
  ]);

  useEffect(()=>{
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('mouseleave', handleDocumentMouseUp);
    return function cleanup() {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('mouseleave', handleDocumentMouseUp);
    };
  },[handleDocumentMouseUp])

  const vScrollMouseDownHandler = useCallback(event => {
    verticalScrollMouseDown(event,verticalScrollThumbStart,verticalScrollBasePoint)
  } ,[verticalScrollMouseDown, verticalScrollThumbStart, verticalScrollBasePoint ]);

  const hScrollMouseDownHandler = useCallback(event => {
    horizontalScrollMouseDown(event,horizontalScrollThumbStart,horizontalScrollBasePoint)
  } ,[horizontalScrollMouseDown, horizontalScrollThumbStart, horizontalScrollBasePoint ]);

  const mouseEnterHandler = useCallback(() => {
    !isHoveringOnContainer && setHoveringOnContainer(true)
    onMouseEnter()
  }, [isHoveringOnContainer, onMouseEnter]);

  const mouseLeaveHandler = useCallback(() => {
    isHoveringOnContainer && setHoveringOnContainer(false)
    if(!isVerticalDragging&&!isHorizontalDragging){
      onMouseLeave()
    }

  }, [isHoveringOnContainer, onMouseLeave, isVerticalDragging,isHorizontalDragging]);

  return (
    <div 
      className={className}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      style={{padding:0,border:0,overflow: `hidden`}} 
      onClick={onClick}
    >

      <div className={className} ref={scrollableDivRef} style={{margin:`0`, position:`relative`}}>
        {children}
      </div>
      
      <ScrollContext.Provider value={contextValues}>
        <VerticalScroll 
          onMouseDownCapture={()=>onStartScrollMouseClick()}
          onMouseUpCapture={()=>onEndScrollMouseClick()}
          onMouseDown={(e)=>vScrollMouseDownHandler(e)}
        />

        <HorizontalScroll 
          onMouseDown={(e)=>hScrollMouseDownHandler(e)}
        />
      </ScrollContext.Provider>
    </div>
  )
}