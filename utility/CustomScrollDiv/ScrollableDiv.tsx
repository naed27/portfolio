import {useCallback, useEffect, useRef, useState} from 'react';
import styles from "./ScrollableDiv.module.scss";

interface Props{
  children: React.ReactNode;
  className?: string;
  dependencies?:any[],
  scrollY?:{
    thumbThickness:number,
    thumbColor:string,
  },
  scrollX?:{
    thumbThickness:number,
    thumbColor:string,
  }
}

export default function ScrollableDiv ({
  children,
  className='',
  dependencies=[],
  scrollY={
    thumbThickness:8,
    thumbColor:'gray',
  },
  scrollX={
    thumbThickness:8,
    thumbColor:'gray',
  }
}:Props) {
  
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const [isVerticalDragging, setVerticalDragging] = useState(false);
  const [verticalScrollThumbStart, setVerticalScrollThumbStart] = useState(0);
  const [showVerticalScrollBar, setShowVerticalScrollBar] = useState(false);
  const [verticalScrollBasePoint, setVerticalScrollBasePoint] = useState(-1);
  const [verticalScrollThumbLength, setVerticalScrollThumbLength] = useState(0);
  const [verticalScrollOffset,setVerticalScrollOffset] = useState(0);

  const [isHorizontalDragging, setHorizontalDragging] = useState(false);
  const [horizontalScrollThumbStart, setHorizontalScrollThumbStart] = useState(0);
  const [showHorizontalScrollBar, setShowHorizontalScrollBar] = useState(false);
  const [horizontalScrollBasePoint, setHorizontalScrollBasePoint] = useState(-1);
  const [horizontalScrollThumbLength, setHorizontalScrollThumbLength] = useState(0);
  const [horizontalScrollOffset,setHorizontalScrollOffset] = useState(0);

  const [isHovering,setHovering] = useState(false);

  const handleMouseOver = useCallback(() => !isHovering && setHovering(true), [isHovering]);
  const handleMouseOut = useCallback(() => isHovering && setHovering(false), [isHovering]);

  const calcVerticalThumbSize = useCallback(()=>{
    setTimeout(()=>{
      if(scrollableDivRef.current===null)return;
      const {scrollHeight,clientHeight} = scrollableDivRef.current;
      const scrollThumbPercentage = clientHeight / scrollHeight;
      const twoScrollBarsSeparator = ((showHorizontalScrollBar)?scrollX.thumbThickness:0)
      const scrollBarThumbHeight = (scrollThumbPercentage * clientHeight)-twoScrollBarsSeparator;
      setVerticalScrollThumbLength(scrollBarThumbHeight);
      setShowVerticalScrollBar(c=>(scrollThumbPercentage<1)?true:false);
    },100)
  },[ showHorizontalScrollBar, scrollX.thumbThickness ]);

  const calcHorizontalThumbSize = useCallback(()=>{
    setTimeout(()=>{
      if(scrollableDivRef.current===null)return;
      const {scrollWidth,clientWidth} = scrollableDivRef.current;
      const scrollThumbPercentage = clientWidth / scrollWidth;
      const twoScrollBarsSeparator = ((showVerticalScrollBar)?scrollY.thumbThickness:0)
      const scrollBarThumbHeight = (scrollThumbPercentage * clientWidth)-twoScrollBarsSeparator;
      setHorizontalScrollThumbLength(scrollBarThumbHeight);
      setShowHorizontalScrollBar(c=>(scrollThumbPercentage<1)?true:false);
    },100)
  },[ showVerticalScrollBar, scrollY.thumbThickness ])

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
    const rectTopHolder= (verticalScrollBasePoint===-1) ? boxBaseTop : verticalScrollBasePoint;

    // scroll limits
    const { offsetHeight,scrollHeight } = scrollableDiv;
    const scrollTopLimit = offsetHeight - verticalScrollThumbLength;
    const scrollBottomLimit = 0;
    
    // setting scroll thumb position
    const mouseY = clientY - rectTopHolder;
    const thumbHalf = verticalScrollThumbLength/2
    const rawScrollThumbTop = mouseY-thumbHalf;

    const scrollThumbTop = Math.min(
      scrollTopLimit,
      Math.max(
        rawScrollThumbTop,
        scrollBottomLimit
      )
    );

    const percentage = scrollThumbTop * (scrollHeight / offsetHeight);
    scrollableDiv.scrollTop = percentage;

    return scrollThumbTop;

  },[ verticalScrollThumbLength, verticalScrollBasePoint ]);

  const horizontalSync = useCallback((clientX,boxBaseLeft=0) => {
    if(scrollableDivRef.current===null)return 0;
    const scrollableDiv = scrollableDivRef.current;
    const rectTopHolder= (horizontalScrollBasePoint===-1) ? boxBaseLeft : horizontalScrollBasePoint;

    // scroll limits
    const { offsetWidth,scrollWidth } = scrollableDiv;
    const scrollLeftLimit = offsetWidth - horizontalScrollThumbLength;
    const scrollRightLimit = 0;
    
    // setting scroll thumb position
    const mouseY = (rectTopHolder - clientX)*-1;
    const thumbHalf = horizontalScrollThumbLength/2
    const rawScrollThumbTop = mouseY-thumbHalf;

    const scrollThumbTop = Math.min(
      scrollLeftLimit,
      Math.max(
        rawScrollThumbTop,
        scrollRightLimit
      )
    );

    const percentage = scrollThumbTop * (scrollWidth / offsetWidth);
    scrollableDiv.scrollLeft = percentage;

    return scrollThumbTop

  },[ horizontalScrollThumbLength, horizontalScrollBasePoint ]);

  
  const verticalScrollMouseDown = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    setVerticalDragging(true);
    const { top } = event.target.getBoundingClientRect();
    const { clientY } = event;

    if(verticalScrollBasePoint===-1){setVerticalScrollBasePoint(top);}

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

  const horizontalScrollMouseDown = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    setHorizontalDragging(true);
    const { left } = event.target.getBoundingClientRect();
    const { clientX } = event;

    if(horizontalScrollBasePoint===-1)setHorizontalScrollBasePoint(left);

    const thumbLeft = horizontalScrollThumbStart;
    const thumbRight = horizontalScrollThumbStart + horizontalScrollThumbLength;
    const mousePosition = clientX - left;
    const thumbCenter = thumbLeft + (horizontalScrollThumbLength/2);
    const thumbX = thumbCenter+left

    if(mousePosition>=thumbLeft && mousePosition<=thumbRight){
      const offset = thumbX-clientX;
      setHorizontalScrollOffset(offset);
      return horizontalSync( (thumbX), top );
    }

    const newScrollStart = horizontalSync( clientX, left );
    const newScrollEnd = newScrollStart + horizontalScrollThumbLength;
    const newThumbCenter = newScrollStart + (horizontalScrollThumbLength/2);
    const newThumbY = newThumbCenter+left

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
  },[handleScroll,dependencies,scrollableDivRef,calcVerticalThumbSize,calcHorizontalThumbSize]);

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
          style={{width:`${scrollY.thumbThickness}px`}} 
        >
          <div 
            className={styles.verticalScrollTrack} 
            onMouseDown={verticalScrollMouseDown}
            style={{height:`calc(100% - ${(showHorizontalScrollBar)?scrollX.thumbThickness:0}px)`}} 
            >
            <div 
              className={styles.verticalScrollThumb} 
              style={{
                height:verticalScrollThumbLength,
                top: verticalScrollThumbStart,
                backgroundColor: `${scrollY.thumbColor}`, 
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
          style={{height:`${scrollX.thumbThickness}px`}} 
        >
          <div 
            className={styles.horizontalScrollTrack} 
            onMouseDown={horizontalScrollMouseDown}
            style={{width:`calc(100% - ${(showVerticalScrollBar)?scrollY.thumbThickness:0}px)`}} 
          >
            <div 
              className={styles.horizontalScrollThumb} 
              style={{
                width: horizontalScrollThumbLength,
                left: horizontalScrollThumbStart,
                backgroundColor: `${scrollY.thumbColor}`, 
              }}
            ></div>
            <div className={styles.horizontalGlassCover}></div>
          </div>
        </div>
      )}

    </div>
  )
}