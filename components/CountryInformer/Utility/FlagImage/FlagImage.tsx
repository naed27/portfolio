import Image from 'next/image'
import { Country } from '../../Types/types';
import styles from './FlagImage.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { calcHeightOffset, calcWidthOffset } from '../functions';

interface Props {
  country: Country, 
  container: HTMLElement | null,
  originalSize?: boolean
}

export default function FlagImage ({ country, container, originalSize = false }:Props) {

  const [dimensions, setDimensions] = useState({width:-1,height:-1})

  const calcDimensions = useCallback(()=>{
    if(!container) return
    const widthOffset = calcWidthOffset(container)
    const heightOffset = calcHeightOffset(container)
    setDimensions({
      width: container.offsetWidth - widthOffset,
      height: container.offsetHeight - heightOffset
    })
  },[container])

  useEffect(()=>{
    calcDimensions();
    window.addEventListener('resize',calcDimensions)
    return () => window.removeEventListener('resize',calcDimensions)
  },[calcDimensions])

  if(dimensions.width == -1) return null

  if(originalSize)
    return <img src={`${country.flags.png}`}  alt={`${country.name.common}'s_flag`}/>

  return (
    <div style={{position: 'relative', width: dimensions.width, height: dimensions.height, overflow: 'hidden'}}>
      <Image 
        src={`${country.flags.png}`} 
        alt={`${country.name.common}'s_flag`}
        layout={'fill'}
        objectFit={'cover'}
        unoptimized
      />
  </div>
  )

}
