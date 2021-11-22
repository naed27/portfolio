import { YGOCard } from '../../Misc/Types';
import styles from '../Styles/Controls.module.scss';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface Props{
  setSelectedCard:Dispatch<SetStateAction<YGOCard | null>>,
  setShowControllers:Dispatch<SetStateAction<boolean>>
}

export default function Controls({props:{setSelectedCard,setShowControllers}}:{props:Props}) {

  const showControllers = useCallback(()=>{
    setShowControllers(current=>!current);
  },[setShowControllers]);


  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={showControllers}>
        Add to Deck
      </div>

      <div className={styles.button} onClick={()=>{setSelectedCard(null)}}>
        Back
      </div>
    </div>
  )
}

