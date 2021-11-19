import styles from '../Styles/PageButtons.module.css'
import { useContext, useMemo } from 'react'
import { GlobalContext } from '../../../Misc/Context';

function PageButtons (){
  
  const {searchedCards,setPageNumber,pageNumber,pageCardCount} = useContext(GlobalContext);

  const maxPage = useMemo(()=>{
    const cardCount = searchedCards.length;
      if(cardCount===0)return 0;
      const displayedCardCount = pageCardCount;
      if(cardCount%displayedCardCount===0){
        return cardCount/displayedCardCount;
      }else{
        return Math.floor(cardCount/displayedCardCount)+1;
      }
  },[ pageCardCount,searchedCards.length]);

  const pageBack = ()=>{
    if(pageNumber<=1)return
    setPageNumber(current=>current-1);
  }

  const pageForward = ()=>{
    if(pageNumber>=maxPage)return
    setPageNumber(current=>current+1);
  }

  return (
    <div className={styles.container} >
      <div className={styles.pageButton} onClick={pageBack}></div>
      <div className={styles.pageStatus}>{`${pageNumber} / ${maxPage}`}</div>
      <div className={styles.pageButton} onClick={pageForward}></div>
    </div>  
  )
}

export default PageButtons
