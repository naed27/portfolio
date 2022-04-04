import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './AudioTitle.module.scss'

export default function AudioTitle () {
  
  const {audioTitle} = useContext(GlobalContext);
  
  return (
    <div className={styles.container} style={{opacity:(audioTitle === null)?0:1}}>
      <div className={styles.title}>{audioTitle}</div> 
    </div>
  )
}