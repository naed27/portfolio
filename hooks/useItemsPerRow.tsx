import { useState, useEffect, RefObject } from 'react'
import { getItemsPerRow } from '../utility/functions';

interface Props {
  containerRef: RefObject<HTMLDivElement>,
  cardWidth: number,
  flexGap?: number,
};

const useItemsPerRow = ({ containerRef, cardWidth, flexGap = 0 }: Props) => {

const [itemCount, setItemCount] = useState(0);

 useEffect(()=>{
    const determineItemCountPerRow = () => {
      if(!containerRef.current) return
      const cardsPerRow = getItemsPerRow({container: containerRef.current, cardWidth, flexGap})
      setItemCount(cardsPerRow)
    }
    determineItemCountPerRow();
    window.addEventListener('resize',determineItemCountPerRow)
    return () => window.removeEventListener('resize',determineItemCountPerRow)
  },[cardWidth, flexGap, containerRef])

  return itemCount

};

export default useItemsPerRow;