import Image from 'next/image';
import { YGOCard } from '../../../Misc/globalTypes';
import styles from '../Styles/Card.module.css';
import { GlobalContext } from '../../../Misc/globalContext';
import React, { useCallback, useContext, memo, useMemo} from 'react';
import { parseLimit, renderCardLimit } from '../../../Misc/globalFunctions';

const Card = ({card}:{card:YGOCard}) => {

  const {setSelectedCard,setSearchIndex,searchedCards,query} = useContext(GlobalContext);

  const viewCard = ()=>{
    setSelectedCard(card);
    setSearchIndex(searchedCards.findIndex(c=>c.id===card.id))
  }

  const onDragHandler = useCallback((e:React.DragEvent<HTMLDivElement>)=>{
    e.dataTransfer.setData('card',JSON.stringify(card));
  },[card]);

  const limit = useMemo(()=>parseLimit(query.cardGame,card.banlist_info),[ card, query.cardGame ]);

  return (
    <div className={styles.container} 
      draggable
      onClick={viewCard}
      onDragStart={(e)=>{onDragHandler(e)}}
    >
      <div className={styles.image}>
        <Image 
          src={`${card.card_images[0].image_url_small}`} 
          alt='card image'
          layout='fill'
          objectFit='contain'
        /> 
        
        {limit<3&&(<div className={styles.limitContainer}>
          {limit}
        </div>)}
      </div>

      <div className={styles.details}>{card.name}</div>
    </div>
  );

}

export default memo(Card)




