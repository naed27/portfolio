import styles from '../Styles/PageButtons.module.scss'
import { useContext } from 'react'
import { GlobalContext } from '../../../Misc/globalContext';
import {ArrowLeft, ArrowRight} from 'lucide-react'

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
      <div className={styles.pageButton} onClick={pageBack}><ArrowLeft size={'30px'} strokeWidth={'1px'}/></div>
      <div className={styles.pageStatus}>{`Page ${pageNumber} of ${maxPageOfTable}`}</div>
      <div className={styles.pageButton} onClick={pageForward}><ArrowRight  size={'30px'} strokeWidth={'1px'}/></div>
    </div>  
  )
}

export default PageButtons
