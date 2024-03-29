import { YGOCard } from "../../Misc/globalTypes"
import styles from '../Styles/ImageViewer.module.scss'
import { Dispatch, SetStateAction, useCallback, useContext, memo } from "react";
import { GlobalContext } from "../../Misc/globalContext";
import ImagePreview from "./ImagePreview";

interface Props{
  setSelectedCard:Dispatch<SetStateAction<YGOCard | null>>,
  searchIndex:number | null,
  setSearchIndex:Dispatch<SetStateAction<number | null>>,
  searchedCards:YGOCard[],
  card:YGOCard,
  showImages?:boolean,
}

function ImageViewer({card}:{card:YGOCard}) {

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
      <div 
        className={'absolute w-[30px] h-full flex justify-center items-center border z-[2] border-solid border-[gray] left-0 top-0 hover:bg-[rgb(22,22,22)]'} 
        onClick={()=>leftButtonHandler(searchIndex)}>{`<`}</div>
      <ImagePreview card={card} showImages={showImages}/>

      <div 
        className={'absolute w-[30px] h-full flex justify-center items-center border z-[2] border-solid border-[gray] right-0 top-0 hover:bg-[rgb(22,22,22)]'} 
        onClick={()=>rightButtonHandler(searchIndex)}>{`>`}</div>
    </div>
  )
}


export default memo(ImageViewer)
