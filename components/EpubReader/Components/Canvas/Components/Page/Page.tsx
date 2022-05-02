import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './Page.module.scss'

export default function Page() {

  const {epub} = useContext(GlobalContext);
  const [page, setPage] = useState<JSX.Element>(<></>)

  useEffect(()=>{
    const page = 
    (epub.length<17)?
      <></>
      : <div dangerouslySetInnerHTML={{__html:epub[17].rawText}} />
    setPage(page)
  },[epub])

  return(
    <div className={styles.container}>
      {page}
    </div>
  )
}