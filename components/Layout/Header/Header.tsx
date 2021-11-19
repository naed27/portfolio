import styles from './Header.module.css'
import BurgerButton from '../Burger/Button/BurgerButton'

export default function Header ({}) {
  return (
    <div className={styles.container}>
      <BurgerButton/>
    </div>
  )
}
