import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './AudioTitle.module.scss'

export default function AudioTitle () {
  
  const { audioTitle } = useContext(GlobalContext);
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>{(audioTitle === null) ? 'No file' : audioTitle}</div> 
    </div>
  )
}