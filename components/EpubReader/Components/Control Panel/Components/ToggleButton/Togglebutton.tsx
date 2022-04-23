import { useCallback, useContext } from 'react'
import { ControlPanelContext } from '../../Context/Context'
import styles from './Togglebutton.module.scss'

export default function Togglebutton () {

  const {setShowPanel} = useContext(ControlPanelContext);

  const onClick = useCallback(()=>{
    setShowPanel(current=>!current)
  },[setShowPanel])


  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={onClick}>
        Controls
      </div>
    </div>
  )
}