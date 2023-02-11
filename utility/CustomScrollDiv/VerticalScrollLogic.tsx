import { useCallback } from 'react';
import { VerticalScrollProps } from './Context';

export default function VerticalScrollLogic(Props:VerticalScrollProps) {
  
  const {
    scroll,scrollableDivRef,
    showHorizontalScrollBar,
    verticalScrollThumbLength,
    setShowVerticalScrollBar,
    setVerticalScrollBasePoint,
    setVerticalScrollThumbLength,
    setVerticalDragging,setVerticalScrollOffset,
  } = Props;

  const calculateThumbSize = useCallback(()=>{
    if(scrollableDivRef.current===null)return;
    const {scrollHeight,clientHeight} = scrollableDivRef.current;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const twoScrollBarsSeparator = ((showHorizontalScrollBar)?(scroll.X.thumbThickness):0)
    const scrollBarThumbLength = ((scrollThumbPercentage * clientHeight))-twoScrollBarsSeparator;
    setVerticalScrollThumbLength(scrollBarThumbLength);
    setShowVerticalScrollBar((scrollThumbPercentage<1)?true:false);
  },[ showHorizontalScrollBar, scroll, scrollableDivRef, setVerticalScrollThumbLength, setShowVerticalScrollBar ]);


  const syncScroll = useCallback((
    clientY,
    verticalScrollBasePoint:number|undefined,
    boxBaseTop=0
    ) => {
    if(scrollableDivRef.current===null)return 0;
    const scrollableDiv = scrollableDivRef.current;
    const rectTopHolder= (verticalScrollBasePoint!==undefined)?verticalScrollBasePoint:boxBaseTop;

    const { offsetHeight,scrollHeight } = scrollableDiv;
    const scrollTopLimit = offsetHeight - verticalScrollThumbLength;
    const scrollBottomLimit = 0;
    
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

  },[ verticalScrollThumbLength, scrollableDivRef ]);

  const mouseDownOnScroll = useCallback((
    event:any,
    verticalScrollThumbStart:number,
    verticalScrollBasePoint:number|undefined
    ) => {
    event.preventDefault();
    event.stopPropagation();
    setVerticalDragging(true);
    const { top } = event.target.getBoundingClientRect();
    const { clientY } = event;

    if(verticalScrollBasePoint===undefined)setVerticalScrollBasePoint(top);

    const thumbTop = verticalScrollThumbStart;
    const thumbBottom = verticalScrollThumbStart + verticalScrollThumbLength;
    const mousePosition = clientY - top;
    const thumbCenter = thumbTop + (verticalScrollThumbLength/2);
    const thumbY = thumbCenter+top

    if(mousePosition>=thumbTop && mousePosition<=thumbBottom){
      const offset = thumbY-clientY;
      setVerticalScrollOffset(offset);
      return syncScroll( (thumbY), top );
    }
    const newScrollStart = syncScroll( clientY, top );
    const newScrollEnd = newScrollStart + verticalScrollThumbLength;
    const newThumbCenter = newScrollStart + (verticalScrollThumbLength/2);
    const newThumbY = newThumbCenter+top

    if(mousePosition>=newScrollStart && mousePosition<=newScrollEnd){
      const offset = newThumbY-clientY;
      return setVerticalScrollOffset(offset);
    }
    setVerticalScrollOffset(0);
    
  }, [ syncScroll, verticalScrollThumbLength, setVerticalScrollOffset, setVerticalDragging, setVerticalScrollBasePoint ]);

  return {calculateThumbSize,syncScroll,mouseDownOnScroll}
}