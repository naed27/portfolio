import { useEffect, useRef, useState } from 'react'
import { Country } from '../../../../../Types/types'
import FlagImage from '../../../../../Utility/FlagImage/FlagImage'
import styles from './CountryImage.module.scss'


export default function CountryImage ({country}: { country: Country}) {

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerElement,setContainerElement] = useState<HTMLDivElement|null>(null);
  

  useEffect(()=>{
    (containerRef.current) && setContainerElement(containerRef.current)
  },[])

  return (
    <div ref={containerRef} className={styles.container}>
      <FlagImage country={country} container={containerElement} originalSize={true}/>
    </div>
  )
}