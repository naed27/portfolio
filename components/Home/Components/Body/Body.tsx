import styles from './Body.module.scss'
import Chest from './Components/Chest/Chest'

export default function Body () {
  return  (
    <div className={styles.container}>
      <Chest/>
      <Chest/>
      <Chest/>
      <Chest/>
      <Chest/>
      <Chest/>
      <Chest/>
      <Chest/>
    </div>
  )
}