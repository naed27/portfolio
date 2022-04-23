import styles from './NavBar.module.scss'
import { useContext, useRef } from 'react'
import Status from './Components/Status/Status'
import Toggler from './Components/Toggler/Toggler'
import { GlobalContext } from '../../Context/GlobalContext'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'

export default function NavBar () {

  const menuRef = useRef<HTMLDivElement>(null);
  const { showNavBarContents, toggleNavBarContents } = useContext(GlobalContext)
  
  useOnClickOutside(menuRef, () => showNavBarContents && toggleNavBarContents(false));

  return (
    <div className={styles.container} ref={menuRef}>
       
      <Toggler/>

      {showNavBarContents&&(
        <>
          <Status/>
        </>
      )}
      
    </div>
  )
}

