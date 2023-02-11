import styles from './Card.module.scss';
import React, { useCallback, useContext, memo, useState, useRef, useEffect} from 'react';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { Country } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import FlagImage from '../../../Utility/FlagImage/FlagImage';

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

  useEffect(()=>{
    if(!cardRef.current) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setShowCard(true));
    observer.observe(cardRef.current);
  },[])

  
  if(invisibleChild)
    return <div className={styles.invisible}></div>

  if(!country)
    return null
  
  return (
    <ScrollableDiv customRef={cardRef} className={styles.container} onClick={viewCard} scrollX={{ scrollBorderRadius:`20px`, trackPadding:0.8 }}>
        {showCard&&
          <div className={styles.details}>
            <div className={styles.text}>
              {country.name.common}
            </div>
          </div>
        }
    </ScrollableDiv>
  );

}

export default memo(Card)




