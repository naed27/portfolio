import styles from './ScrollStyles.module.scss';
import { useContext, useCallback, RefObject,  } from 'react';
import { ScrollContext } from './Context'

interface Props{
  thumbRef: RefObject<HTMLDivElement>,
  onMouseDown?: (e: any) => any;
  onMouseUp?: (e: any) => any;
  onMouseDownCapture?: (e: any) => any;
  onMouseUpCapture?: (e: any) => any;
}

export default function HorizontalScroll ({
  onMouseDown = () => null,
  onMouseUp = () => null,
  onMouseDownCapture = () => null,
  onMouseUpCapture = () => null,
  thumbRef
}:Props) {

  const mouseDownHandler = useCallback((event: React.MouseEvent<HTMLElement>)=>{
    thumbRef.current&&thumbRef.current.setAttribute('data-mousedown', 'true');
    onMouseDown(event)
  },[onMouseDown, thumbRef])

  const mouseUpHandler = useCallback(onMouseUp,[onMouseUp])

  const {
    scroll,
    horizontalScrollThumbLength,
    horizontalScrollThumbStart,
    showVerticalScrollBar,
    showHorizontalScrollBar,
    isHoveringOnContainer
  } = useContext(ScrollContext);
  

  return (
    <>
      {showHorizontalScrollBar&&(
        ( scroll.X.onHoverOnly===false||
          scroll.X.onHoverOnly&&isHoveringOnContainer)&&(
          <div 
            className={styles.horizontalScrollWrapper}
            style={{height:`${scroll.X.thumbThickness}px`}} 
          >
            <div 
              className={styles.horizontalScrollTrack} 
              onMouseDown={mouseDownHandler}
              onMouseUp={mouseUpHandler}
              onMouseDownCapture={onMouseDownCapture}
              onMouseUpCapture={onMouseUpCapture}
              style={{
                padding: `${scroll.X.trackPadding}px`,
                width:`calc(100% - ${(showVerticalScrollBar)?scroll.X.thumbThickness:0}px)`,
                border:scroll.X.trackBorder,
                backgroundColor:scroll.X.trackColor,
                borderRadius:scroll.X.scrollBorderRadius,
              }} 
            >
              <div 
                data-mousedown = {`false`}
                ref={thumbRef}
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
        )
      )}
    </>
  )
}