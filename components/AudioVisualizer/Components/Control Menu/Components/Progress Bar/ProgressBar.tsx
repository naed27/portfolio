import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './ProgressBar.module.scss'

export default function ProgressBar () {
  
  const { progressLineRef } = useContext(GlobalContext)

  return (
    <div className={styles.progressContainer}>
      <div ref={progressLineRef} className={styles.progressBar}></div>
    </div>
  )
}