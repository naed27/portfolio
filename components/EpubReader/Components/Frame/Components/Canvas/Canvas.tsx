import styles from './Canvas.module.scss'
import { GlobalContext } from '../../../../Context/GlobalContext'
import { useContext } from 'react'

export default function Canvas() {

  const {canvasRef} = useContext(GlobalContext)

  return(
    <div id={'epubCanvas007'} ref={canvasRef} className={styles.container}>
    </div>
  )
}