import styles from './ScrollStyles.module.scss';
import { useContext } from 'react';
import { ScrollContext } from './Context'

interface Props{
  onMouseDown?: (e: any) => any;
}

export default function VerticalScroll ({onMouseDown=()=>null}:Props) {

  const {
    scroll,
    verticalScrollThumbLength,
    verticalScrollThumbStart,
    showHorizontalScrollBar,
    showVerticalScrollBar,
    isVerticalDragging,
    isHoveringOnContainer
  } = useContext(ScrollContext);
  
  return (
    <>
      {(showVerticalScrollBar)&&(
        ( scroll.Y.onHoverOnly===false||
          scroll.Y.onHoverOnly&&isHoveringOnContainer||
          isVerticalDragging)&&(
          <div 
            className={styles.verticalScrollWrapper}
            style={{width:`${scroll.Y.thumbThickness}px`}} 
          >
            <div 
              className={styles.verticalScrollTrack} 
              onMouseDown={onMouseDown}
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
      )}
    </>
  )
}