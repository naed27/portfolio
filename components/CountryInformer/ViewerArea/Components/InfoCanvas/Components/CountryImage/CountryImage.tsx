import { useEffect, useRef, useState } from 'react'
import { Country } from '../../../../../Types/types'
import FlagImage from '../../../../../Utility/FlagImage/FlagImage'
import styles from './CountryImage.module.scss'

interface Props {
  country: Country,
  viewState: 'map' | 'flag'
};

export default function CountryImage ({country, viewState}: Props) {

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerElement,setContainerElement] = useState<HTMLDivElement|null>(null);
  

  useEffect(()=>{
    (containerRef.current) && setContainerElement(containerRef.current)
  },[])

  if(viewState === 'map') return null

  return (
    <div ref={containerRef} className={styles.container}>
      {<FlagImage country={country} container={containerElement} originalSize={true}/>}
    </div>
  )
}