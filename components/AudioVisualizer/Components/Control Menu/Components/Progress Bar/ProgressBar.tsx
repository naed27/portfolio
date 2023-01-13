import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './ProgressBar.module.scss'

export default function ProgressBar () {
  
  const { progressBarRef, progressLineRef } = useContext(GlobalContext)

  return (
    <div className={styles.progressContainer}>
      <div ref={progressBarRef} className={styles.progressBar}></div>
      <div ref={progressLineRef} className={styles.progressLine}></div>
    </div>
  )
}