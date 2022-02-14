import styles from '../Styles/Field.module.scss'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/globalContext';

export default function AdvancedButtons () {
  
  
  const { setShowMoreFilters } = useContext(GlobalContext);



  return (
    <div className={styles.container} style={{marginTop:`20px`}} >
      <div className={styles.advancedButton}>Reset</div>
      <div className={styles.advancedButton}>Search</div>
    </div>  
  )
}
