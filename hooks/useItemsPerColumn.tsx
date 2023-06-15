import { useState, useEffect, RefObject } from 'react'
import { getItemsPerColumn } from '../utility/functions';

interface Props {
  containerRef: RefObject<HTMLDivElement>,
  cardHeight: number,
  flexGap?: number,
};

const useItemsPerColumn = ({ containerRef, cardHeight, flexGap = 0 }: Props) => {

const [itemCount, setItemCount] = useState(0);

 useEffect(()=>{
    const determineItemCountPerRow = () => {
      if(!containerRef.current) return
      const cardsPerColumn = getItemsPerColumn({container: containerRef.current, cardHeight, flexGap})
      setItemCount(cardsPerColumn)
    }
    determineItemCountPerRow();
    window.addEventListener('resize',determineItemCountPerRow)
    return () => window.removeEventListener('resize',determineItemCountPerRow)
  },[cardHeight, flexGap, containerRef])

  return itemCount
};

export default useItemsPerColumn;