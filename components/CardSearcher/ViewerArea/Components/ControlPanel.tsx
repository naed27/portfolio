import { useCallback,useContext,useMemo } from "react";
import { YGOCard } from "../../Misc/globalTypes";
import styles from "../Styles/ControlPanel.module.scss";
import Controller from './Controller';
import { parseLimit } from '../../Misc/globalFunctions';
import { GlobalContext } from "../../Misc/globalContext";
import { DeckFunctions } from "../../Hooks/DeckStore";

export default function ControlPanel({card,functions}:{card:YGOCard, functions:DeckFunctions}){

  const {query} = useContext(GlobalContext);
  const {getExistingCardCount} = functions;
  const getCardCount = useCallback(getExistingCardCount,[getExistingCardCount]);
  const getCardLimit = useCallback(parseLimit,[parseLimit]);
  const cardCount = useMemo(()=>getCardCount(card),[getCardCount,card]);
  const cardLimit = useMemo(()=>getCardLimit(query.cardGame,card.banlist_info),[query.cardGame,getCardLimit,card]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Stocks: {`${cardLimit-cardCount}/${cardLimit}`}
        </div>
        <div className={styles.body}>
          <div className={styles.deck}>
            <Controller card={card} deckCategory={'main'} functions={functions}/>
          </div>
          <div className={styles.deck}>
            <Controller card={card} deckCategory={'side'} functions={functions}/>
          </div>
        </div>
      </div>
    </div>
  )
}