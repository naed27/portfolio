import { useCallback } from 'react';
import { ContextProps } from './Context';

export default function HorizontalScrollLogic(Props:ContextProps) {

  const {
    scroll,
    scrollableDivRef,
    showVerticalScrollBar,
    horizontalScrollBasePoint,
    horizontalScrollThumbStart,
    horizontalScrollThumbLength,
    setHorizontalDragging,
    setHorizontalScrollOffset,
    setShowHorizontalScrollBar,
    setHorizontalScrollBasePoint,
    setHorizontalScrollThumbLength,
  } = Props;

  const calcHorizontalThumbSize = useCallback(()=>{
    if(scrollableDivRef.current===null)return;
    const {scrollWidth,clientWidth} = scrollableDivRef.current;
    const scrollThumbPercentage = clientWidth / scrollWidth;
    const twoScrollBarsSeparator = ((showVerticalScrollBar)?(scroll.Y.thumbThickness):0)
    const scrollBarThumbLength = ((scrollThumbPercentage * clientWidth))-twoScrollBarsSeparator;
    setHorizontalScrollThumbLength(scrollBarThumbLength);
    setShowHorizontalScrollBar((scrollThumbPercentage<1)?true:false);
  },[ showVerticalScrollBar, scroll, setHorizontalScrollThumbLength, setShowHorizontalScrollBar, scrollableDivRef ]);

  const horizontalSync = useCallback((clientX,boxBaseLeft=0) => {
    if(scrollableDivRef.current===null)return 0;
    const scrollableDiv = scrollableDivRef.current;
    const rectTopHolder= (horizontalScrollBasePoint!==undefined)?horizontalScrollBasePoint:boxBaseLeft;

    const { offsetWidth,scrollWidth } = scrollableDiv;
    const scrollStartLimit = offsetWidth - horizontalScrollThumbLength
    const scrollEndLimit = 0;
    
    const mouseY = (rectTopHolder - clientX)*-1;
    const thumbHalf = horizontalScrollThumbLength/2
    const rawScrollThumbStart = mouseY-thumbHalf;

    const scrollThumbStart = Math.min(
      scrollStartLimit,
      Math.max(
        rawScrollThumbStart,
        scrollEndLimit
      )
    );

    const percentage = scrollThumbStart * (scrollWidth / offsetWidth);
    scrollableDiv.scrollLeft = percentage;

    return scrollThumbStart

  },[ horizontalScrollThumbLength, horizontalScrollBasePoint, scrollableDivRef ]);

  const horizontalScrollMouseDown = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    setHorizontalDragging(true);
    const { left: leftOffset } = event.target.getBoundingClientRect();
    const { clientX } = event;

    if(horizontalScrollBasePoint===undefined)setHorizontalScrollBasePoint(leftOffset);

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
  }, [ horizontalSync, horizontalScrollBasePoint, horizontalScrollThumbStart, horizontalScrollThumbLength, setHorizontalDragging, setHorizontalScrollBasePoint, setHorizontalScrollOffset ]);

  return {calcHorizontalThumbSize,horizontalSync,horizontalScrollMouseDown}
}