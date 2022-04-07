import styles from './BurgerButton.module.css'

import { FunctionComponent, useContext } from 'react'
import { LayoutContext } from '../../Context/LayoutContext'
import BurgerMenu from '../Menu/BurgerMenu';

const BurgerButton:FunctionComponent = () => {
  
  const {displayBurgerMenu,setDisplayBurgerMenu} = useContext(LayoutContext);
  
  const toggleBurger = () => setDisplayBurgerMenu(current=>!current)

  return (

    <div className={styles.container} onClick={toggleBurger}>
      <div className={styles.burgerLine}/>
      <div className={styles.burgerLine}/>
      <div className={styles.burgerLine}/>
      {displayBurgerMenu&&<BurgerMenu/>}
    </div>

  )
}

export default BurgerButton;