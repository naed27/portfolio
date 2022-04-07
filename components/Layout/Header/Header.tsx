import styles from './Header.module.scss'
import BurgerButton from '../Burger/Button/BurgerButton'

export default function Header ({}) {
  return (
    <div className={styles.container}>
      <div className={styles.fixed}>
        <BurgerButton/>
      </div>
    </div>
   
  )
}
