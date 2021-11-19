import { useRef, useState } from "react";
import { burgerContext } from '../../contexts/burgerContext'
import Body from './Body/Body'
import Header from './Header/Header'
import styles from './Layout.module.css'

export default function Layout ({children}:any){

  // store variables
  const [burgerDisplay,setBurgerDisplay] = useState(false);

  const resetBurger: React.MouseEventHandler<HTMLDivElement> = (e)=>{
    // if(burgerDisplay)setBurgerDisplay(false)
    null
  }

  // store values
  const value = {
    burgerDisplay,
    setBurgerDisplay,
  }

  return (
    <div className={styles.container} onClick={resetBurger}>
      <burgerContext.Provider value={value}>
        <Header/>
        <Body>
          {children}
        </Body>
      </burgerContext.Provider>
    </div>
  )
}