import styles from './ScrollStyles.module.scss';
import { useContext,useCallback, RefObject } from 'react';
import { ScrollContext } from './Context'
import { motion } from 'framer-motion'

interface Props{
  animation?: {} 
  thumbRef: RefObject<HTMLDivElement>,
  onMouseDown?: (e: any) => any,
  onMouseUp?: (e: any) => any,
  onMouseDownCapture?: (e: any) => any,
  onMouseUpCapture?: (e: any) => any,
}

export default function VerticalScroll ({
  onMouseDown = () => null,
  onMouseUp = () => null,
  onMouseDownCapture = () => null,
  onMouseUpCapture = () => null,
  thumbRef,
  animation = {}
}:Props) {

  const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLElement>)=>{
    thumbRef.current&&thumbRef.current.setAttribute('data-mousedown', 'true');
    onMouseDown(event)
  },[onMouseDown, thumbRef])

  const mouseUpHandler = useCallback(onMouseUp,[onMouseUp])

  const {
    scroll,
    verticalScrollThumbLength,
    verticalScrollThumbStart,
    showHorizontalScrollBar,
    showVerticalScrollBar,
    isVerticalDragging,
    isHoveringOnContainer
  } = useContext(ScrollContext);

  if( !showVerticalScrollBar )return null

  
  if( scroll.Y.onHoverOnly
      &&!isHoveringOnContainer
      &&!isVerticalDragging )return null

  return (
    <motion.div 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
      className={styles.verticalScrollWrapper}
      style={{width:`${scroll.Y.thumbThickness}px`}} 
    >
      <div 
        className={styles.verticalScrollTrack} 
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseDownCapture={onMouseDownCapture}
        onMouseUpCapture={onMouseUpCapture}
        style={{
          padding: `${scroll.Y.trackPadding}px`,
          height:`calc(100% - ${(showHorizontalScrollBar)?scroll.Y.thumbThickness:0}px)`,
          border:scroll.Y.trackBorder,
          backgroundColor:scroll.Y.trackColor,
          borderRadius:scroll.Y.scrollBorderRadius,
        }} 
        >
        <div 
          data-mousedown = {`false`}
          ref={thumbRef}
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
    </motion.div>
  )
}