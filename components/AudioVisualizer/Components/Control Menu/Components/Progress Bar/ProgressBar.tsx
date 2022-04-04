import { useContext, useRef } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './ProgressBar.module.scss'

export default function ProgressBar () {
  
  const { progressLineRef, audioTitle } = useContext(GlobalContext)

  if(audioTitle === null) 
    return null
    
  return (
    <div className={styles.progressContainer}>
      <div ref={progressLineRef} className={styles.progressBar}></div>
    </div>
  )
}