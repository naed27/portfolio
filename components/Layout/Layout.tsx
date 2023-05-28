import { useState, ReactNode } from "react";
import Body from './Body/Body'
import NavBar from './NavBar/NavBar'
import styles from './Layout.module.scss'
import { LayoutContext } from './Context/LayoutContext'
import { AnimatePresence } from "framer-motion";

interface Props{
  children: ReactNode
}
const Layout = ({children}: Props) => {

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
            <AnimatePresence exitBeforeEnter>
                {children}
            </AnimatePresence>
          </Body>
      </LayoutContext.Provider>
    </div>
  )
}

export default Layout