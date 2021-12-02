
import {useCallback, useEffect, useRef, useState} from 'react';
import styles from "./ScrollableDiv.module.scss";

export default function ScrollableDiv ({children,className,dependencies=[]}:{children:React.ReactNode,className:any,dependencies?:any[]}) {
  
  const divRef = useRef<HTMLDivElement>(null);
  const [scrollThumbHeight,setScrollHeightSize] = useState(0);
  const [scrollThumbTopCoordinate,setScrollThumbTopCoordinate] = useState(0);
  const [isDragging,setDragging] = useState(false);
  const [isHovering,setHovering] = useState(false);
  const [rectTop,setRectTop] = useState(0);

  const handleMouseOver = useCallback(() => !isHovering && setHovering(true), [isHovering]);
  const handleMouseOut = useCallback(() => isHovering && setHovering(false), [isHovering]);

  const calcScrollThumbSize = useCallback(()=>{
    setTimeout(()=>{
      if(divRef.current===null)return;
      const {scrollHeight,clientHeight} = divRef.current;
      const scrollThumbPercentage = clientHeight / scrollHeight;
      const scrollBarThumbHeight = scrollThumbPercentage * clientHeight
      setScrollHeightSize(scrollBarThumbHeight);
    },100)
  },[])

  const handleScroll = useCallback(() => {
    if (!divRef.current) return;
    const scrollHostElement = divRef.current;
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;
    const newTop = (scrollTop / scrollHeight) * offsetHeight;
    setScrollThumbTopCoordinate(newTop);
  }, [ divRef ]);

  const syncMouseAndScroll = useCallback((rect,clientY) => {
    if(divRef.current===null)return;
    const scrollHostElement = divRef.current;
    if(rectTop===0)setRectTop(rect.top);

    // scroll limits
    const { offsetHeight,scrollHeight } = scrollHostElement;
    const scrollTopLimit = offsetHeight - scrollThumbHeight;
    const scrollBottomLimit = 0;
    
    // scroll thumb position
    const mouseY = clientY - rectTop;
    const initialScrollThumbTop = mouseY-(scrollThumbHeight/2);

    const newScrollThumbTop = Math.min(
      scrollTopLimit,
      Math.max(
        initialScrollThumbTop,
        scrollBottomLimit
      )
    );

    const percentage = newScrollThumbTop * (scrollHeight / offsetHeight);
    scrollHostElement.scrollTop = percentage;

  },[ scrollThumbHeight, rectTop ]);

  
  const handleScrollThumbMouseDown = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    const { clientY } = event;
    syncMouseAndScroll( rect, clientY );
    setDragging(true);
  }, [ syncMouseAndScroll ]);

  const handleDocumentMouseMove = useCallback((event:any) => {
    if (!isDragging) return
    event.preventDefault();
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    const { clientY } = event;
    syncMouseAndScroll( rect, clientY );
  },[ isDragging, syncMouseAndScroll ]);

  const handleDocumentMouseUp = useCallback(event => {
    if (!isDragging)return
    event.preventDefault();
    setDragging(false);
  },[isDragging]);

  useEffect(() => {
    if (!divRef.current) return;
    const scrollHostElement = divRef.current;
    calcScrollThumbSize()
    window.addEventListener('resize', calcScrollThumbSize);
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return function cleanup(){
      window.removeEventListener('resize', calcScrollThumbSize)
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    }
  },[handleScroll,dependencies,divRef,calcScrollThumbSize]);

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
      className={`${className} ${styles.wrapper}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >

      <div className={`${className} ${styles.container}`} ref={divRef}>
        {children}
      </div>
     
      <div 
        className={styles.scrollTrack} 
        onMouseDown={handleScrollThumbMouseDown}
      >
        <div 
          className={styles.scrollThumb} 
          style={{height:scrollThumbHeight, top: scrollThumbTopCoordinate }}
        ></div>
        <div className={styles.glassCover}></div>
      </div>
    </div>
  )
}