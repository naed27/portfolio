import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from "./ScrollableDiv.module.scss";

const DEFAULT_SCROLL_VALUES = {
  Y:{
    thumbThickness:6,
    thumbColor:'white',
    thumbOpacity:0.5,
    trackColor:'transparent',
    trackBorder:`0px`,
    scrollBorderRadius:`0px`,
  },
  X:{
    thumbThickness:6,
    thumbColor:'white',
    thumbOpacity:0.5,
    trackColor:'transparent',
    trackBorder:`0px`,
    scrollBorderRadius:`0px`,
  }
}

interface Props{
  children: React.ReactNode;
  className?: string;
  dependencies?:any[],
  scrollY?:{
    thumbThickness?:number,
    thumbColor?:string,
    thumbOpacity?:number,
    trackColor?:string,
    trackBorder?:string,
    scrollBorderRadius?:string,
  },
  scrollX?:{
    thumbThickness?:number,
    thumbColor?:string,
    thumbOpacity?:number,
    trackColor?:string,
    trackBorder?:string,
    scrollBorderRadius?:string,
  }
  onClick?:() => any
}

export default function ScrollableDiv ({
  children,
  className='',
  dependencies=[],
  scrollY={
    thumbThickness:DEFAULT_SCROLL_VALUES.Y.thumbThickness,
    thumbColor:DEFAULT_SCROLL_VALUES.Y.thumbColor,
    thumbOpacity:DEFAULT_SCROLL_VALUES.Y.thumbOpacity,
    trackColor:DEFAULT_SCROLL_VALUES.Y.trackColor,
    trackBorder:DEFAULT_SCROLL_VALUES.Y.trackBorder,
    scrollBorderRadius:DEFAULT_SCROLL_VALUES.Y.scrollBorderRadius,
  },
  scrollX={
    thumbThickness:DEFAULT_SCROLL_VALUES.X.thumbThickness,
    thumbColor:DEFAULT_SCROLL_VALUES.X.thumbColor,
    thumbOpacity:DEFAULT_SCROLL_VALUES.X.thumbOpacity,
    trackColor:DEFAULT_SCROLL_VALUES.X.trackColor,
    trackBorder:DEFAULT_SCROLL_VALUES.X.trackBorder,
    scrollBorderRadius:DEFAULT_SCROLL_VALUES.X.scrollBorderRadius,
  },
  onClick: onClickHandler=()=>{}
}:Props) {

  
  const scroll = useMemo(() => {
    return {
      Y:{
        thumbThickness : (scrollY.thumbThickness!==undefined)? scrollY.thumbThickness : DEFAULT_SCROLL_VALUES.Y.thumbThickness,
        thumbColor :  (scrollY.thumbColor!==undefined)? scrollY.thumbColor : DEFAULT_SCROLL_VALUES.Y.thumbColor,
        thumbOpacity : (scrollY.thumbOpacity!==undefined)? scrollY.thumbOpacity : DEFAULT_SCROLL_VALUES.Y.thumbOpacity,
        trackColor : (scrollY.trackColor!==undefined)? scrollY.trackColor : DEFAULT_SCROLL_VALUES.Y.trackColor,
        trackBorder : (scrollY.trackBorder!==undefined)? scrollY.trackBorder : DEFAULT_SCROLL_VALUES.Y.trackBorder,
        scrollBorderRadius : (scrollY.scrollBorderRadius!==undefined)? scrollY.scrollBorderRadius : DEFAULT_SCROLL_VALUES.Y.scrollBorderRadius,
      },
      X:{
        thumbThickness : (scrollX.thumbThickness!==undefined)? scrollX.thumbThickness : DEFAULT_SCROLL_VALUES.X.thumbThickness,
        thumbColor :  (scrollX.thumbColor!==undefined)? scrollX.thumbColor : DEFAULT_SCROLL_VALUES.X.thumbColor,
        thumbOpacity : (scrollX.thumbOpacity!==undefined)? scrollX.thumbOpacity : DEFAULT_SCROLL_VALUES.X.thumbOpacity,
        trackColor : (scrollX.trackColor!==undefined)? scrollX.trackColor : DEFAULT_SCROLL_VALUES.X.trackColor,
        trackBorder : (scrollX.trackBorder!==undefined)? scrollX.trackBorder : DEFAULT_SCROLL_VALUES.X.trackBorder,
        scrollBorderRadius : (scrollX.scrollBorderRadius!==undefined)? scrollX.scrollBorderRadius : DEFAULT_SCROLL_VALUES.X.scrollBorderRadius,
      }
    }
  },[scrollY,scrollX])
  
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

  const [isHovering,setHovering] = useState(false);

  const handleMouseOver = useCallback(() => !isHovering && setHovering(true), [isHovering]);
  const handleMouseOut = useCallback(() => isHovering && setHovering(false), [isHovering]);

  const calcVerticalThumbSize = useCallback(()=>{
    if(scrollableDivRef.current===null)return;
    const {scrollHeight,clientHeight} = scrollableDivRef.current;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const twoScrollBarsSeparator = ((showHorizontalScrollBar)?scroll.X.thumbThickness:0)
    const scrollBarThumbLength = (scrollThumbPercentage * clientHeight)-twoScrollBarsSeparator;
    setVerticalScrollThumbLength(scrollBarThumbLength);
    setShowVerticalScrollBar(c=>(scrollThumbPercentage<1)?true:false);
  },[ showHorizontalScrollBar, scroll.X.thumbThickness ]);

  const calcHorizontalThumbSize = useCallback(()=>{
    if(scrollableDivRef.current===null)return;
    const {scrollWidth,clientWidth} = scrollableDivRef.current;
    const scrollThumbPercentage = clientWidth / scrollWidth;
    const twoScrollBarsSeparator = ((showVerticalScrollBar)?(scroll.Y.thumbThickness+2):0)
    const scrollBarThumbLength = (scrollThumbPercentage * clientWidth)-twoScrollBarsSeparator;
    setHorizontalScrollThumbLength(scrollBarThumbLength);
    setShowHorizontalScrollBar(c=>(scrollThumbPercentage<1)?true:false);
  },[ showVerticalScrollBar, scroll.Y.thumbThickness ])

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

  const verticalSync = useCallback((clientY,boxBaseTop=0) => {
    if(scrollableDivRef.current===null)return 0;
    const scrollableDiv = scrollableDivRef.current;
    const rectTopHolder= verticalScrollBasePoint || boxBaseTop;

    // scroll limits
    const { offsetHeight,scrollHeight } = scrollableDiv;
    const scrollTopLimit = offsetHeight - verticalScrollThumbLength;
    const scrollBottomLimit = 0;
    
    // setting scroll thumb position
    const mouseY = clientY - rectTopHolder;
    const thumbHalf = verticalScrollThumbLength/2
    const rawScrollThumbStart = mouseY-thumbHalf;

    const scrollThumbStart = Math.min(
      scrollTopLimit,
      Math.max(
        rawScrollThumbStart,
        scrollBottomLimit
      )
    );

    const percentage = scrollThumbStart * (scrollHeight / offsetHeight);
    scrollableDiv.scrollTop = percentage;

    return scrollThumbStart;

  },[ verticalScrollThumbLength, verticalScrollBasePoint ]);

  
  const verticalScrollMouseDown = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    setVerticalDragging(true);
    const { top } = event.target.getBoundingClientRect();
    const { clientY } = event;

    if(!verticalScrollBasePoint){setVerticalScrollBasePoint(top);}

    const thumbTop = verticalScrollThumbStart;
    const thumbBottom = verticalScrollThumbStart + verticalScrollThumbLength;
    const mousePosition = clientY - top;
    const thumbCenter = thumbTop + (verticalScrollThumbLength/2);
    const thumbY = thumbCenter+top

    if(mousePosition>=thumbTop && mousePosition<=thumbBottom){
      const offset = thumbY-clientY;
      setVerticalScrollOffset(offset);
      return verticalSync( (thumbY), top );
    }
    const newScrollStart = verticalSync( clientY, top );
    const newScrollEnd = newScrollStart + verticalScrollThumbLength;
    const newThumbCenter = newScrollStart + (verticalScrollThumbLength/2);
    const newThumbY = newThumbCenter+top

    if(mousePosition>=newScrollStart && mousePosition<=newScrollEnd){
      const offset = newThumbY-clientY;
      return setVerticalScrollOffset(offset);
    }
    setVerticalScrollOffset(0);
    
  }, [ verticalSync, verticalScrollBasePoint, verticalScrollThumbStart, verticalScrollThumbLength ]);


  const horizontalSync = useCallback((clientX,boxBaseLeft=0) => {
    if(scrollableDivRef.current===null)return 0;
    const scrollableDiv = scrollableDivRef.current;
    const rectTopHolder= horizontalScrollBasePoint || boxBaseLeft;

    // scroll limits
    const { offsetWidth,scrollWidth } = scrollableDiv;
    const scrollLeftLimit = offsetWidth - horizontalScrollThumbLength;
    const scrollRightLimit = 0;
    
    // setting scroll thumb position
    const mouseY = (rectTopHolder - clientX)*-1;
    const thumbHalf = horizontalScrollThumbLength/2
    const rawScrollThumbStart = mouseY-thumbHalf;

    const scrollThumbStart = Math.min(
      scrollLeftLimit,
      Math.max(
        rawScrollThumbStart,
        scrollRightLimit
      )
    );

    const percentage = scrollThumbStart * (scrollWidth / offsetWidth);
    scrollableDiv.scrollLeft = percentage;

    return scrollThumbStart

  },[ horizontalScrollThumbLength, horizontalScrollBasePoint ]);

  
  const horizontalScrollMouseDown = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    setHorizontalDragging(true);
    const { left: leftOffset } = event.target.getBoundingClientRect();
    const { clientX } = event;

    if(!horizontalScrollBasePoint)setHorizontalScrollBasePoint(leftOffset);

    const thumbStart = horizontalScrollThumbStart;
    const thumbEnd = horizontalScrollThumbStart + horizontalScrollThumbLength;
    const mousePosition = clientX - leftOffset;
    const thumbCenter = thumbStart + (horizontalScrollThumbLength/2);
    const thumbX = thumbCenter+leftOffset;

    if(mousePosition>=thumbStart && mousePosition<=thumbEnd){
      const offset = thumbX-clientX;
      setHorizontalScrollOffset(offset);
      return horizontalSync( (thumbX), top );
    }

    const newScrollStart = horizontalSync( clientX, leftOffset );
    const newScrollEnd = newScrollStart + horizontalScrollThumbLength;
    const newThumbCenter = newScrollStart + (horizontalScrollThumbLength/2);
    const newThumbY = newThumbCenter+leftOffset

    if(mousePosition>=newScrollStart && mousePosition<=newScrollEnd){
      const offset = newThumbY-clientX;
      return setHorizontalScrollOffset(offset);
    }

    setHorizontalScrollOffset(0);
  }, [ horizontalSync, horizontalScrollBasePoint, horizontalScrollThumbStart, horizontalScrollThumbLength ]);

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
    calcVerticalThumbSize()
    calcHorizontalThumbSize()
    window.addEventListener('resize', calcVerticalThumbSize);
    scrollableDiv.addEventListener("scroll", handleScroll, true);
    return function cleanup(){
      window.removeEventListener('resize', calcVerticalThumbSize)
      scrollableDiv.removeEventListener("scroll", handleScroll, true);
    }
  },[handleScroll,dependencies,children,scrollableDivRef,calcVerticalThumbSize,calcHorizontalThumbSize]);

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
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{padding:0,border:0,overflow: `hidden`}} 
      onClick={onClickHandler}
    >

      <div 
        className={className} 
        ref={scrollableDivRef}
        style={{margin:`0`}} 
        >

        {children}

      </div>
      
      {/* --------- vertical scroll ---------- */}

      {showVerticalScrollBar&&(
        <div 
          className={styles.verticalScrollWrapper}
          style={{width:`${scroll.Y.thumbThickness}px`}} 
        >
          <div 
            className={styles.verticalScrollTrack} 
            onMouseDown={verticalScrollMouseDown}
            style={{
              height:`calc(100% - ${(showHorizontalScrollBar)?scroll.X.thumbThickness:0}px)`,
              border:scroll.Y.trackBorder,
              backgroundColor:scroll.Y.trackColor,
              borderRadius:scroll.Y.scrollBorderRadius,
            }} 
            >
            <div 
              className={styles.verticalScrollThumb} 
              style={{
                height:verticalScrollThumbLength,
                top: verticalScrollThumbStart,
                opacity: `${scroll.Y.thumbOpacity}`,
                backgroundColor: `${scroll.Y.thumbColor}`, 
                borderRadius:scroll.Y.scrollBorderRadius,
              }}
            ></div>
            <div className={styles.verticalScrollGlassCover}></div>
          </div>
        </div>
      )}

      
      {/* --------- horizontal scroll ---------- */}
      {showHorizontalScrollBar&&(
        <div 
          className={styles.horizontalScrollWrapper}
          style={{height:`${scroll.X.thumbThickness}px`}} 
        >
          <div 
            className={styles.horizontalScrollTrack} 
            onMouseDown={horizontalScrollMouseDown}
            style={{
              width:`calc(100% - ${(showVerticalScrollBar)?scroll.X.thumbThickness:0}px)`,
              border:scroll.X.trackBorder,
              backgroundColor:scroll.X.trackColor,
              borderRadius:scroll.X.scrollBorderRadius,
            }} 
          >
            <div 
              className={styles.horizontalScrollThumb} 
              style={{
                width: horizontalScrollThumbLength,
                left: horizontalScrollThumbStart,
                backgroundColor: `${scroll.X.thumbColor}`, 
                opacity: `${scroll.X.thumbOpacity}`,
                borderRadius:scroll.X.scrollBorderRadius,
              }}
            ></div>
            <div className={styles.horizontalScrollGlassCover}></div>
          </div>
        </div>
      )}

    </div>
  )
}