import { YGOCard } from '../../Misc/globalTypes';
import styles from '../Styles/Controls.module.scss';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface Props{
  setSelectedCard:Dispatch<SetStateAction<YGOCard | null>>,
  setShowControllers:Dispatch<SetStateAction<boolean>>,
  showControllers:boolean
}

export default function Switches({props:{setSelectedCard,setShowControllers,showControllers}}:{props:Props}) {

  const closeViewer = useCallback(()=>setSelectedCard(null),
  [setSelectedCard]);
  
  const toggleControllers = useCallback(()=>setShowControllers(current=>!current),
  [setShowControllers]);

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={toggleControllers}>
        {!showControllers?(`Add to Deck`):(`Description`)}
      </div>

      <div className={styles.button} onClick={closeViewer}>
        Close
      </div>
    </div>
  )
}