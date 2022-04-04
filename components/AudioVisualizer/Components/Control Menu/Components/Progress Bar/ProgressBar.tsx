import { useContext, useRef } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './ProgressBar.module.scss'

export default function ProgressBar () {
  
  const { progressLineRef, audioTitle } = useContext(GlobalContext)

  return (
    <div className={styles.progressContainer}  style={{opacity:(audioTitle === null)?0:1}}>
      <div ref={progressLineRef} className={styles.progressBar}></div>
    </div>
  )
}