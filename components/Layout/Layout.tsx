import { useState } from "react";
import Body from './Body/Body'
import NavBar from './NavBar/NavBar'
import styles from './Layout.module.scss'
import { LayoutContext } from './Context/LayoutContext'

export default function Layout ({children}:any){

  const [displayBurgerMenu,setDisplayBurgerMenu] = useState(false);
  const [address,setAddress] = useState('/');
  const [absoluteNavBar, setAbsoluteNavBar] = useState(false);
  
  const value = {
    address,
    absoluteNavBar, 
    displayBurgerMenu,
    setAddress,
    setAbsoluteNavBar,
    setDisplayBurgerMenu,
  }

  return (
    <div className={styles.container}>
      <LayoutContext.Provider value={value}>
        <NavBar/>
        <Body>
          {children}
        </Body>
      </LayoutContext.Provider>
    </div>
  )
}