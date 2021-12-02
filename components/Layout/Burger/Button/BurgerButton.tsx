import styles from './BurgerButton.module.css'

import { FunctionComponent, useContext } from 'react'
import { burgerContext } from '../../../../contexts/burgerContext';
import BurgerMenu from '../Menu/BurgerMenu';

const BurgerButton:FunctionComponent = ()=> {
  
  const {setBurgerDisplay} = useContext(burgerContext);
  
  const toggleBurger = () => setBurgerDisplay(current=>!current)

  return (

    <div className={styles.container} onClick={toggleBurger}>
      <div className={styles.burgerLine}/>
      <div className={styles.burgerLine}/>
      <div className={styles.burgerLine}/>
      <BurgerMenu/>
    </div>

  )
}

export default BurgerButton;