import animation from './Animation';
import { motion } from 'framer-motion';
import styles from './Card.module.scss';
import { Country } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import FlagImage from '../../../Utility/FlagImage/FlagImage';
import { stringifyQuantity } from '../../../Utility/functions';
import React, { useCallback, useContext, memo, useState, useRef, useEffect, useMemo} from 'react';

interface Props {
  country?: Country,
  invisibleChild?: boolean,
}

const Card = ({ country, invisibleChild = false }:Props) => {

  const { setSelectedCountry }  = useContext(GlobalContext);
  const [viewLock, setViewLock] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null)
  const [showCard, setShowCard] = useState(false);
  const nameTextRef = useRef<HTMLDivElement>(null);
  const continentTextRef = useRef<HTMLDivElement>(null);
  const populationTextRef = useRef<HTMLDivElement>(null);

  const viewCard = useCallback(()=>{
    if( viewLock ) return
    if( country === null || country === undefined ) return
    setSelectedCountry(country);
  },[ country, setSelectedCountry, viewLock])

  const countryInfo = useMemo(()=>{
    if(!country) return
    return {
      name: country.name.common,
      continent: country.continents[0],
      population: stringifyQuantity(country.population)
    }
  },[country])

  useEffect(()=>{
    if(!cardRef.current) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting ? setShowCard(true) : setShowCard(false));
    observer.observe(cardRef.current);

    return ()=> observer.disconnect()
  },[])
  
  if(invisibleChild)
    return <div className={styles.invisible}></div>

  if(!country)
    return null
  
  return (
    <div ref={cardRef} className={styles.container} onClick={viewCard}>
        {(showCard&&countryInfo)&&
        <motion.div className={styles.wrapper}
        variants={animation}
        initial='initial'
        animate='final'
        exit='exit'
        >
          <div className={styles.cardImage}>
            <FlagImage country={country} container={cardRef.current}/>
          </div>
          <div className={styles.infoContainer}>
            <div  className={styles.cardHeader}>
              <span ref={nameTextRef}>{countryInfo.name}</span>
            </div>
            <div className={styles.cardBody}>
              <div><span ref={continentTextRef}>{`${countryInfo.continent}`}</span></div>
              <div><span ref={populationTextRef}>{`Population: ${countryInfo.population}`}</span></div>
            </div>
          </div>
        </motion.div>}
    </div>
  );

}

export default memo(Card)



























// const fitTitle = useCallback(() => {
//   if(!cardRef.current||!nameTextRef.current||!continentTextRef.current||!populationTextRef.current) return
//   const card = cardRef.current;
//   const name = nameTextRef.current;
//   const continent = continentTextRef.current;
//   const population = populationTextRef.current;

//   console.log(card.clientWidth);
//   console.log(name.clientWidth);


//   (card.clientWidth < name.clientWidth) ? name.classList.add(styles.animate) : name.classList.remove(styles.animate);
//   (card.clientWidth < continent.clientWidth) ? continent.classList.add(styles.animate) : continent.classList.remove(styles.animate);
//   (card.clientWidth < population.clientWidth) ? population.classList.add(styles.animate) : population.classList.remove(styles.animate);
  
// },[])

// useEffect(()=>{
//   fitTitle()
//   window.addEventListener('resize',fitTitle)
  
//   return () => window.removeEventListener('resize',fitTitle)
// },[fitTitle])
