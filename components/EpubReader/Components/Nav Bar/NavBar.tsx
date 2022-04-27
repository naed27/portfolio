import styles from './NavBar.module.scss'
import { useContext, useRef } from 'react'
import Status from './Components/Status/Status'
import Toggler from './Components/Toggler/Toggler'
import { GlobalContext } from '../../Context/GlobalContext'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import Menu from './Components/Menu/Menu'

export default function NavBar () {

  const navBarRef = useRef<HTMLDivElement>(null);
  const { showNavBarContents, toggleNavBarContents } = useContext(GlobalContext)
  
  useOnClickOutside(navBarRef, () => {
    showNavBarContents && toggleNavBarContents(false)
  });

  return (
    <div className={styles.container} ref={navBarRef}>
       
      <Toggler/>

      {showNavBarContents&&(
        <>
          <Menu/>
          <Status/>
        </>
      )}
      
    </div>
  )
}

