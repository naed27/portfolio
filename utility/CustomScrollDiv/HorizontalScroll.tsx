import styles from './ScrollStyles.module.scss';
import { useContext } from 'react';
import { ScrollContext } from './Context'

interface Props{
  onMouseDown?: (e: any) => any;
}

export default function HorizontalScroll ({onMouseDown=()=>null}:Props) {

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
              onMouseDown={onMouseDown}
              style={{
                padding: `${scroll.X.trackPadding}px`,
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
        )
      )}
    </>
  )
}