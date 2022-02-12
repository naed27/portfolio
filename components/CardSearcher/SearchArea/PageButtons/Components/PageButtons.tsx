import styles from '../Styles/PageButtons.module.css'
import { useContext } from 'react'
import { GlobalContext } from '../../../Misc/globalContext';

function PageButtons (){
  
  const {setPageNumber,pageNumber,maxPageOfTable} = useContext(GlobalContext);

  const pageBack = ()=>{
    if(pageNumber <= 1)return
    setPageNumber(current=>current-1);
  }

  const pageForward = ()=>{
    if(pageNumber >= maxPageOfTable)return
      setPageNumber(current=>current+1);
  }

  return (
    <div className={styles.container} >
      <div className={styles.pageButton} onClick={pageBack}></div>
      <div className={styles.pageStatus}>{`${pageNumber} / ${maxPageOfTable}`}</div>
      <div className={styles.pageButton} onClick={pageForward}></div>
    </div>  
  )
}

export default PageButtons
