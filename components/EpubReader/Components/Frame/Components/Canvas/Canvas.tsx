import { useContext } from 'react'
import { GlobalContext } from '../../../../Context/GlobalContext'
import styles from './Canvas.module.scss'
import useManualRender from './Hooks/ManualRender'

export default function Canvas() {

  const {canvasSize} = useContext(GlobalContext)
  const {dangerousJSX} = useManualRender()

  return(
    <div className={styles.container} style={{width:`${canvasSize.width}px`, height:`${canvasSize.height}px`}}>
      {dangerousJSX}
    </div>
  )
}