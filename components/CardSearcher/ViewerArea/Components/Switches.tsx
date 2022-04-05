import styles from '../Styles/Controls.module.scss';
import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { GlobalContext } from '../../Misc/globalContext';

interface Props{
  setShowControllers:Dispatch<SetStateAction<boolean>>,
  showControllers:boolean
}

export default function Switches({props}:{props:Props}) {

  const {setSelectedCard, showDeckBuilder} = useContext(GlobalContext)
  const closeViewer = useCallback(()=>setSelectedCard(null),[setSelectedCard])
  const {showControllers,setShowControllers} = props
  
  const toggleControllers = useCallback(()=>setShowControllers(current=>!current),
  [setShowControllers]);

  return (
    <div className={styles.container}>
      {showDeckBuilder&&<div className={styles.button} onClick={toggleControllers}>
        {!showControllers?(`Manage`):(`Description`)}
      </div>}
      <div className={styles.button} onClick={closeViewer}>
        Close
      </div>
    </div>
  )
}