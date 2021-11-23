import styles from '../Styles/Controller.module.scss';
import { useRef, useState, useMemo, useCallback } from 'react';
import { YGOCard } from '../../Misc/Types';
import { capitalizeFirstLetter,getCardCategory } from '../../Misc/Functions';

interface Props{
  addToDeck:(deckType: string, card: YGOCard) => void,
  removeFromDeck:(deckType: string, card: YGOCard) => void,
  getDeckCardCount:(card: YGOCard, deckType: string) => number,
  getExistingCardCount:(card: YGOCard) => number,
  getDeckStatus: (deckType: string) => string
  card:YGOCard
}

export default function Controller({props,deck}:{props:Props,deck:string}){

  const {addToDeck,removeFromDeck,getDeckCardCount,getDeckStatus,card} = props
  const deckType = deck==='main'?getCardCategory(card):deck;

  const addCard = useCallback(addToDeck,[addToDeck]);
  const removeCard = useCallback(removeFromDeck,[removeFromDeck]);
  const fetchDeckStatus = useCallback(getDeckStatus,[getDeckStatus]);
  const deckStatus = useMemo(()=>fetchDeckStatus(deckType),[fetchDeckStatus,deckType]);
  const cardcount = useMemo(()=>getDeckCardCount(card,deck),[card,deck,getDeckCardCount]);
  
  const buttonRef = useRef(null);

  const control = useCallback((action:string)=>{
    if(action==='add')return addCard(deckType,card)
    return removeCard(deckType,card);
  },[card,deckType,addCard,removeCard])

  return (
    <div className={styles.container} ref={buttonRef}>
       
        <div className={styles.label}>
          {`${capitalizeFirstLetter(deckType)}`}
        </div>

        <div className={styles.stats}>
          {`${deckStatus}`}
        </div>
        
        <div className={styles.controllers}>
          <div className={styles.controller}onClick={()=>control('remove')}>-</div>
          <div className={styles.controller}>{cardcount}</div>
          <div className={styles.controller}onClick={()=>control('add')}>+</div>
        </div> 
    </div>
  )
}

