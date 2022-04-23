import styles from './NavBar.module.scss'
import { useCallback, useContext, useRef } from 'react'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import { GlobalContext } from '../../Context/GlobalContext'
import Contents from './Components/Contents/Contents'
import Status from './Components/Status/Status'

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

function Toggler () {

  const {showNavBarContents,toggleNavBarContents} = useContext(GlobalContext);

  const onClick = useCallback(()=> toggleNavBarContents(current => !current), [toggleNavBarContents])

  return (
    <div className={styles.togglerContainer} >
      <div className={styles.button} onClick={onClick} >
        {!showNavBarContents?'︾':'︽'}
      </div>
    </div>
  )
}