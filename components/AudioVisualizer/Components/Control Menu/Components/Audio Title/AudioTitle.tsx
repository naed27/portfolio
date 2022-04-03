import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './AudioTitle.module.scss'

export default function AudioTitle () {
  
  const {audioTitle} = useContext(GlobalContext);

  if(!audioTitle) return null;
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>{audioTitle}</div> 
    </div>
  )
}