import { YGOCard } from "../../Misc/globalTypes"
import Image from 'next/image'
import styles from '../Styles/CardImage.module.scss'
import { Dispatch, SetStateAction, useCallback, useContext } from "react";
import { GlobalContext } from "../../Misc/globalContext";

interface Props{
  setSelectedCard:Dispatch<SetStateAction<YGOCard | null>>,
  searchIndex:number | null,
  setSearchIndex:Dispatch<SetStateAction<number | null>>,
  searchedCards:YGOCard[],
  card:YGOCard,
  showImages?:boolean,
}

function CardImage({card}:{card:YGOCard}) {

  const {
    showImages, 
    searchIndex,
    searchedCards, 
    setSearchIndex, 
    setSelectedCard,
  } = useContext(GlobalContext);

  const leftButtonHandler = useCallback((searchIndex:number|null)=>{
    const currentIndex = searchIndex;
    if(currentIndex === null) return null;
    const newIndex = currentIndex <= 0 ? searchedCards.length-1 : currentIndex-1;

    setSearchIndex(newIndex)
    setSelectedCard(searchedCards[newIndex]);
  },[searchedCards, setSelectedCard, setSearchIndex]);


  const rightButtonHandler = useCallback((searchIndex:number|null)=>{
    const currentIndex = searchIndex;
    if(currentIndex === null) return null;
    const newIndex = currentIndex>=searchedCards.length-1?0:currentIndex+1;
    const newCard = searchedCards[newIndex];
    
    setSearchIndex(newIndex)
    setSelectedCard(newCard);
  },[searchedCards, setSelectedCard, setSearchIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.leftButton} onClick={()=>leftButtonHandler(searchIndex)}>{`<`}</div>
      {showImages&&(<Image 
          src={`${card.card_images[0].image_url}`} 
          alt='card image'
          layout='fill'
          objectFit='contain'
          unoptimized
      />)}
      <div className={styles.rightButton} onClick={()=>rightButtonHandler(searchIndex)}>{`>`}</div>
    </div>
  )
}


export default CardImage
