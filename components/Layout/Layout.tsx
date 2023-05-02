import { useState } from "react";
import Body from './Body/Body'
import NavBar from './NavBar/NavBar'
import styles from './Layout.module.scss'
import { LayoutContext } from './Context/LayoutContext'

export default function Layout ({children}:any){

  const [showNavBar,setShowNavBar] = useState(true);
  const [absoluteNavBar, setAbsoluteNavBar] = useState(false);
  
  const value = {
    showNavBar,
    absoluteNavBar, 
    setShowNavBar,
    setAbsoluteNavBar
  }

  return (
    <div className={styles.container}>
      <LayoutContext.Provider value={value}>
        {showNavBar&&<NavBar/>}
        <Body>
          {children}
        </Body>
      </LayoutContext.Provider>
    </div>
  )
}