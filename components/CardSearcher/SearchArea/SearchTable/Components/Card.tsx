import Image from 'next/image';
import { YGOCard } from '../../../Misc/globalTypes';
import styles from '../Styles/Card.module.css';
import { GlobalContext } from '../../../Misc/globalContext';
import React, { useCallback, useContext } from 'react';
import { renderCardLimit } from '../../../Misc/globalFunctions';

const Card = ({card}:{card:YGOCard}) => {

  const {setSelectedCard,setSearchIndex,searchedCards} = useContext(GlobalContext);

  const viewCard = ()=>{
    setSelectedCard(card);
    setSearchIndex(searchedCards.findIndex(c=>c.id===card.id))
  }

  const onDragHandler = useCallback((e:React.DragEvent<HTMLDivElement>)=>{
    e.dataTransfer.setData('card',JSON.stringify(card));
  },[card]);

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
      </div>

      <div className={styles.details}>{card.name}</div>
      {renderCardLimit(card)}
    </div>
  );

}

export default Card




