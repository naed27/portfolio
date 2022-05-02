import { useContext, useCallback } from 'react';
import { GlobalContext } from '../../../../../../Context/GlobalContext';
import styles from './Toggler.module.scss'

export default function Toggler () {

  const { toggleMenuContents } = useContext(GlobalContext)

  const handleClick = useCallback(() => {
    console.log('toggled menu')
    toggleMenuContents(current => !current)
  }, [toggleMenuContents])

  return (
    <div className={styles.container} onClick={handleClick}>
    </div>
  );
}