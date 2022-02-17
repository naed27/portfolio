import { YGOCard } from "../../Misc/globalTypes"
import Image from 'next/image'
import styles from '../Styles/CardImage.module.scss'
import { Dispatch, SetStateAction, useCallback } from "react";

interface Props{
  setSelectedCard:Dispatch<SetStateAction<YGOCard | null>>,
  searchIndex:number | null,
  setSearchIndex:Dispatch<SetStateAction<number | null>>,
  searchedCards:YGOCard[],
  card:YGOCard,
}

function CardImage({props:{
  setSelectedCard,
  searchIndex,
  setSearchIndex,
  searchedCards,
  card}}:{props:Props}) {

  const leftButtonHandler = useCallback((searchIndex:number|null)=>{
    const currentIndex = searchIndex;
    if(currentIndex === null) return null;
    const newIndex = currentIndex<=0? searchedCards.length-1 : currentIndex-1;
    const newCard = searchedCards[newIndex];
    setSelectedCard(newCard);
    return newIndex
  },[searchedCards,setSelectedCard]);


  const rightButtonHandler = useCallback((searchIndex:number|null)=>{
    const currentIndex = searchIndex;
    if(currentIndex === null) return null;
    const newIndex = currentIndex>=searchedCards.length-1?0:currentIndex+1;
    const newCard = searchedCards[newIndex];
    setSelectedCard(newCard);
    return newIndex;
  },[searchedCards,setSelectedCard]);

  return (
    <div className={styles.container}>
      <div className={styles.leftButton} onClick={()=>{setSearchIndex(leftButtonHandler(searchIndex))}}>{`<`}</div>
      {/* <Image 
          src={`${card.card_images[0].image_url}`} 
          alt='card image'
          layout='fill'
          objectFit='contain'
      /> */}
      <div className={styles.rightButton} onClick={()=>{setSearchIndex(rightButtonHandler(searchIndex))}}>{`>`}</div>
    </div>
  )
}


export default CardImage
