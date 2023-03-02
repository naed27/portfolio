import styles from './Card.module.scss';
import React, { useCallback, useContext, memo, useState, useRef, useEffect, useMemo} from 'react';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { Country } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import FlagImage from '../../../Utility/FlagImage/FlagImage';
import { stringifyQuantity } from '../../../Utility/functions';

interface Props {
  country?: Country,
  invisibleChild?: boolean,
}

const Card = ({ country, invisibleChild = false }:Props) => {

  const { setSelectedCountry }  = useContext(GlobalContext);
  const [viewLock, setViewLock] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null)
  const [showCard, setShowCard] = useState(false);

  const viewCard = useCallback(()=>{
    if(viewLock) return
    if( country === null || country === undefined )return
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
    <ScrollableDiv customRef={cardRef} className={styles.container} onClick={viewCard} scrollX={{ scrollBorderRadius:`20px`, trackPadding:0.8 }}>
        {(showCard&&countryInfo)&&
        <>
          <div className={styles.countryImage}>
            <FlagImage country={country}/>
          </div>
          <div className={styles.info}>
            <div  className={styles.infoHeader}>
              <div className={styles.countryName}> {countryInfo.name} </div>
            </div>
            <div  className={styles.infoBody}>
              <div className={styles.countryContinents}> {`${countryInfo.continent}`} </div>
              <div className={styles.countryPopulation}> {`Population: ${countryInfo.population}`} </div>
            </div>
          </div>
        </>
          
        }
    </ScrollableDiv>
  );

}

export default memo(Card)




