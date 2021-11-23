import { useCallback,useMemo } from "react";
import { YGOCard } from "../../Misc/Types";
import styles from "../Styles/ControlPanel.module.scss";
import Controller from './Controller';
import { getCardLimit } from '../../Misc/Functions';

interface Props{
  addToDeck:(deckType: string, card: YGOCard) => void,
  removeFromDeck:(deckType: string, card: YGOCard) => void,
  getDeckCardCount:(card: YGOCard, deckType: string) => number,
  getExistingCardCount:(card: YGOCard) => number,
  getDeckStatus: (deckType: string) => string
  card:YGOCard
}

export default function ControlPanel({props}:{props:Props}){

  const {getExistingCardCount,card} = props
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
            <Controller props={props} deck={'main'}/>
          </div>
          <div className={styles.deck}>
            <Controller props={props} deck={'side'}/>
          </div>
        </div>
      </div>
    </div>
  )
}