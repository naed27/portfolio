import { Dispatch, SetStateAction, useCallback,useMemo } from "react";
import { DeckFunctions, YGOCard } from "../../Misc/globalTypes";
import styles from "../Styles/ControlPanel.module.scss";
import Controller from './Controller';
import { getCardLimit } from '../../Misc/globalFunctions';

interface Props{
  addToDeck:(deckType: string, card: YGOCard) => void,
  removeFromDeck:(deckType: string, card: YGOCard) => void,
  getDeckCardCount:(card: YGOCard, deckType: string) => number,
  getExistingCardCount:(card: YGOCard) => number,
  getDeck: (category: string) => (YGOCard | null)[],
  setShowControllers: Dispatch<SetStateAction<boolean>>,
  card:YGOCard
}

export default function ControlPanel({props,functions}:{props:Props,functions:DeckFunctions}){

  const {getExistingCardCount,setShowControllers,card} = props
  const getCardCount = useCallback(getExistingCardCount,[getExistingCardCount]);
  const getCardMax = useCallback(getCardLimit,[getCardLimit]);
  const cardCount = useMemo(()=>getCardCount(card),[getCardCount,card]);
  const cardLimit = useMemo(()=>getCardMax(card),[getCardMax,card]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Stocks: {`${cardLimit-cardCount}/${cardLimit}`}
        </div>
        <div className={styles.body}>
          <div className={styles.deck}>
            <Controller props={{...props,setShowControllers}} deck={'main'} functions={functions}/>
          </div>
          <div className={styles.deck}>
            <Controller props={{...props,setShowControllers}} deck={'side'} functions={functions}/>
          </div>
        </div>
      </div>
    </div>
  )
}