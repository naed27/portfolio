import styles from '../Styles/Controller.module.scss';
import { Dispatch, SetStateAction, useRef, useMemo, useCallback, useState } from 'react';
import { YGOCard } from '../../Misc/globalTypes';
import { capitalizeFirstLetter,getCardCategory } from '../../Misc/globalFunctions';
import MiniDeck from './MiniDeck';
import { DeckFunctions } from '../../Hooks/DeckStore';

export default function Controller({
  card,
  functions,
  deckCategory,
}:{
  card:YGOCard,
  deckCategory:string,
  functions:DeckFunctions,
}){

  const {addToDeck,removeFromDeck,getExistingCardCount,getDeck} = functions;
  const [showMiniDeck,setShowMiniDeck] = useState(false);

  const deckType = useMemo(()=>{
    if(deckCategory==='main')return getCardCategory(card)
    return deckCategory;
  },[ deckCategory,card ]);

  const deck = useMemo(()=>{
    return getDeck(deckType);
  },[deckType,getDeck]);

  const cardcount = useMemo(()=>getExistingCardCount(card),[ card, getExistingCardCount ]);

  const deckStatus = useMemo(()=>{
    const numOfCards = deck.filter((slot)=>slot!==null).length;
    const deckSize = deck.length;
    return `${numOfCards}/${deckSize}`;
  },[deck]);
  
  const buttonRef = useRef(null);

  const control = useCallback((action:'-'|'+')=>{
    if(action==='+')return addToDeck(deckType,card)
    return removeFromDeck(deckType,card);
  },[card,deckType,addToDeck,removeFromDeck])

  return (
    <div className={styles.container} ref={buttonRef}>
       
        <div className={styles.label} onClick={()=>setShowMiniDeck(c=>!c)}>
          {!showMiniDeck?(`${capitalizeFirstLetter(deckType)}`):('Back')}
        </div>

        {showMiniDeck?
        <MiniDeck functions={functions} deckLength={deck.length} deckType={deckType}/>
        :
        <>
          <div className={styles.stats}>
            {`${deckStatus}`}
          </div>
        
          <div className={styles.controllers}>
            <div className={styles.controller}onClick={()=>control('-')}>-</div>
            <div className={styles.status}>{cardcount}</div>
            <div className={styles.controller}onClick={()=>control('+')}>+</div>
          </div> 
        </>
        }

    </div>
  )
}

