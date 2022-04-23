import styles from './Toggler.module.scss'
import  { useCallback, useContext } from 'react'
import { GlobalContext } from '../../../../Context/GlobalContext'

export default function Toggler () {

  const {showNavBarContents,toggleNavBarContents} = useContext(GlobalContext);

  const onClick = useCallback(()=> toggleNavBarContents(current => !current), [toggleNavBarContents])

  return (
    <div className={styles.container} >
      <div className={styles.button} onClick={onClick} >
        {!showNavBarContents?'︾':'︽'}
      </div>
    </div>
  )
}