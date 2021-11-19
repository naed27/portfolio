import styles from './BurgerButton.module.css'

import { FunctionComponent, useContext } from 'react'
import { burgerContext } from '../../../../contexts/burgerContext';

const BurgerButton:FunctionComponent = ()=> {
  
  const {setBurgerDisplay} = useContext(burgerContext);
  
  const toggleBurger = () =>{
    setBurgerDisplay(current=>!current)
  }

  return (

    // burger button
    <div className={styles.container} onClick={toggleBurger}>
        <div className={styles.burgerLine}/>
        <div className={styles.burgerLine}/>
        <div className={styles.burgerLine}/>
    </div>

  )
}

export default BurgerButton;