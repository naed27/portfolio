import styles from '../Styles/Controller.module.scss';
import { Dispatch, SetStateAction, useRef, useMemo, useCallback, useState } from 'react';
import { DeckFunctions, YGOCard } from '../../Misc/globalTypes';
import { capitalizeFirstLetter,getCardCategory } from '../../Misc/globalFunctions';
import MiniDeck from './MiniDeck';

interface Props{
  addToDeck:(deckType: string, card: YGOCard) => void,
  removeFromDeck:(deckType: string, card: YGOCard) => void,
  getDeckCardCount:(card: YGOCard, deckType: string) => number,
  getExistingCardCount:(card: YGOCard) => number,
  getDeck: (category: string) => (YGOCard | null)[],
  setShowControllers: Dispatch<SetStateAction<boolean>>,
  card:YGOCard
}

export default function Controller({props,deck:deckCategory,functions}:{props:Props,deck:string,functions:DeckFunctions}){

  const {addToDeck,removeFromDeck,getDeckCardCount,setShowControllers,getDeck,card} = props;
  const [showMiniDeck,setShowMiniDeck] = useState(false);

  const deckType = useMemo(()=>{
    if(deckCategory==='main')return getCardCategory(card)
    return deckCategory;
  },[ deckCategory,card ]);

  const deck = useMemo(()=>{
    return getDeck(deckType);
  },[deckType,getDeck]);

  const cardcount = useMemo(()=>getDeckCardCount(card,deckCategory),[card,deckCategory,getDeckCardCount]);

  const deckStatus = useMemo(()=>{
    const numOfCards = deck.filter((slot)=>slot!==null).length;
    const deckSize = deck.length;
    return `${numOfCards}/${deckSize}`;
  },[deck]);
  
  const buttonRef = useRef(null);

  const control = useCallback((action:string)=>{
    if(action==='add')return addToDeck(deckType,card)
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
            <div className={styles.controller}onClick={()=>control('remove')}>-</div>
            <div className={styles.status}>{cardcount}</div>
            <div className={styles.controller}onClick={()=>control('add')}>+</div>
          </div> 
        </>
        }
        

       
    </div>
  )
}

