import styles from './Canvas.module.scss';
import {useContext, useEffect, useState} from 'react'
import { GlobalContext } from '../../Context/GlobalContext'

export default function Canvas () {
  const {epub} = useContext(GlobalContext);
  const [page, setPage] = useState<JSX.Element>(<></>)

  useEffect(()=>{
    const page = 
    (epub.length<10)?
      <></>
      : <div dangerouslySetInnerHTML={{__html:epub[10].rawText}} />
    setPage(page)
  },[epub])

  return (
    <div className={styles.container}>
      {page}
    </div>
  )
}