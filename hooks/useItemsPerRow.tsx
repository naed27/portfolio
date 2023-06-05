import { useState, useEffect, RefObject } from 'react'
import { getItemsPerRow } from '../utility/functions';

interface Props {
  wrapperRef: RefObject<HTMLDivElement>,
  cardWidth: number,
  flexGap?: number,
};

const useItemsPerRow = ({ wrapperRef, cardWidth, flexGap = 0 }: Props) => {

const [itemCount, setItemCount] = useState(0);

 useEffect(()=>{
    const determineItemCountPerRow = () => {
      if(!wrapperRef.current) return
      const cardsPerRow = getItemsPerRow({container: wrapperRef.current, cardWidth, flexGap})
      setItemCount(cardsPerRow)
    }
    determineItemCountPerRow();
    window.addEventListener('resize',determineItemCountPerRow)
    return () => window.removeEventListener('resize',determineItemCountPerRow)
  },[cardWidth, flexGap, wrapperRef])

  return itemCount

};

export default useItemsPerRow;