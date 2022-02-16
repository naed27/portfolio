import { YGOCard } from '../../../Misc/globalTypes';
import styles from '../Styles/Card.module.css';
import { GlobalContext } from '../../../Misc/globalContext';
import React, { useCallback, useContext, memo, useMemo, useRef, useEffect, useState} from 'react';
import { parseLimit } from '../../../Misc/globalFunctions';
import CardImage from '../../../Utility/CardImage/CardImage';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';

interface Props {
  card?:YGOCard|null
  cardSize:{width:number, height:number}
}

const Card = ({card, cardSize}:Props) => {

  const {setSelectedCard,setSearchIndex,searchedCards,query} = useContext(GlobalContext);
  const holderRef = useRef<HTMLDivElement>(null);

  const viewCard = ()=>{
    if( card===null || card===undefined )return
    setSelectedCard(card);
    setSearchIndex(searchedCards.findIndex(c=>c.id===card.id))
  }

  const onDragHandler = useCallback((e:React.DragEvent<HTMLDivElement>)=>{
    e.dataTransfer.setData('card',JSON.stringify(card));
  },[card]);

  const limit = useMemo(()=>{
    if(card===null || card===undefined) return -1
    return parseLimit(query.cardGame,card.banlist_info)
  },[ card, query.cardGame ]);

  return (
    <div 
      className={styles.container} 
      draggable
      onClick={viewCard}
      onDragStart={(e)=>{onDragHandler(e)}}
      style={{height:`${cardSize.height}px`}}
      ref={holderRef}
    >
      {card&&(
      <>
        <div 
          className={styles.imageContainer}
          style={{width:`${cardSize.width}px`, minWidth:`${cardSize.width}px`}}>
          <CardImage card={card} limit={limit}/>
        </div>

        <div className={styles.details} >
          <ScrollableDiv className={styles.text} 
            scrollX={{
              scrollBorderRadius:`20px`, 
              trackPadding:0.5,
            }}>
              {card.name}
          </ScrollableDiv>
        </div>
      </>
      )}
    </div>
  );

}

export default memo(Card)




