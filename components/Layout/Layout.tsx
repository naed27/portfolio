import { useState } from "react";
import { burgerContext } from '../../contexts/burgerContext'
import Body from './Body/Body'
import Header from './Header/Header'
import styles from './Layout.module.scss'

export default function Layout ({children}:any){

  // store variables
  const [burgerDisplay,setBurgerDisplay] = useState(false);
  
  // store values
  const value = {burgerDisplay,setBurgerDisplay}

  return (
    <div className={styles.container}>
      <burgerContext.Provider value={value}>
        <Header/>
        <Body>
          {children}
        </Body>
      </burgerContext.Provider>
    </div>
  )
}