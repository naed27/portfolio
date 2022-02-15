import styles from './ScrollStyles.module.scss';
import { useContext,useCallback } from 'react';
import { ScrollContext } from './Context'

interface Props{
  onMouseDown?: (e: any) => any;
  onMouseUp?: (e: any) => any;
}

export default function VerticalScroll ({
  onMouseDown = () => null,
  onMouseUp = () => null
}:Props) {

  const mouseDownHandler = useCallback(onMouseDown,[onMouseDown])
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
    <div 
      className={styles.verticalScrollWrapper}
      style={{width:`${scroll.Y.thumbThickness}px`}} 
    >
      <div 
        className={styles.verticalScrollTrack} 
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        style={{
          padding: `${scroll.Y.trackPadding}px`,
          height:`calc(100% - ${(showHorizontalScrollBar)?scroll.Y.thumbThickness:0}px)`,
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
  )
}