import BurgerMenu from "../Burger/Menu/BurgerMenu";
import styles from './Body.module.css'

export default function Body ({children}:any){
  return (
    <div className={styles.container}>
      <BurgerMenu/>
      {children}
    </div>
  )
}