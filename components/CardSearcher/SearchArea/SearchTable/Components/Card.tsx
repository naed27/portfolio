import { motion } from 'framer-motion';
import { YGOCard } from '../../../Misc/globalTypes';
import styles from '../Styles/Card.module.scss';
import { GlobalContext } from '../../../Misc/globalContext';
import React, { useCallback, useContext, memo, useMemo, useState} from 'react';
import { parseLimit } from '../../../Misc/globalFunctions';
import CardImage from '../../../Utility/CardImage/CardImage';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { delay } from '../../../../../utility/functions';

interface Props {
  card?:YGOCard|null
  cardSize:{width:number, height:number}
}

const animation= {
  initial:{
    opacity:0
  },
  final:{
    opacity:1,
    transition:{
      duration:0.3
    }
  },
  exit:{
    opacity:0,
    transition:{
      duration:0.2
    }
  }
}

const Card = ({card, cardSize}:Props) => {

  const {setSelectedCard,setSearchIndex,searchedCards,query,showImages} = useContext(GlobalContext);
  const [viewLock,setViewLock] = useState(false);

  const viewCard = useCallback(()=>{
    if(viewLock)return
    if( card===null || card===undefined )return
    setSelectedCard(card);
    setSearchIndex(searchedCards.findIndex(c=>c.id===card.id))
  },[ card, searchedCards, setSelectedCard, setSearchIndex, viewLock ])

  const limit = useMemo(()=>{
    if(card===null || card===undefined) return -1
    return parseLimit(query.cardGame,card.banlist_info)
  },[ card, query.cardGame ]);

  return (
    <div
      // variants={animation}
      // initial='initial'
      // animate='final'
      // exit='exit'
      className={styles.container}
      onClick={viewCard}
      style={{height:`${cardSize.height}px`}}
    >
      {card&&(
      <>
        <div 
          className={styles.imageContainer}
          style={{width:`${cardSize.width}px`, minWidth:`${cardSize.width}px`}}>
          <CardImage card={card} limit={limit} showImages={showImages}/>
        </div>

        <div className={styles.details} >
          <ScrollableDiv 
            className={styles.text} 
            onEndScrollMouseClick={async () =>{ delay(300); setViewLock(false) }}
            onStartScrollMouseClick={()=>{ setViewLock(true) }}
            scrollX={{
              scrollBorderRadius:`20px`, 
              trackPadding:0.5,
            }}
          >
            {card.name}
          </ScrollableDiv>
        </div>
      </>
      )}
    </div>
  );

}

export default memo(Card)




