import styles from './Body.module.scss'
import Chest from './Components/Chest/Chest'

export default function Body () {
  return  (
    <div className={styles.container}>
      <Chest label='R E S U M E'/>
      <Chest label='C O N T A C T S'/>
      <Chest label='P R O J EC T S'/>
    </div>
  )
}