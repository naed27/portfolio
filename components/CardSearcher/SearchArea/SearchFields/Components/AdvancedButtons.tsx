import styles from '../Styles/Field.module.scss'
import { useCallback, useContext, } from 'react'
import { Searcher } from '../../../Hooks/SearchTools'
import { initialQuery } from '../../../Misc/initializers'
import { GlobalContext } from '../../../Misc/globalContext'

export default function AdvancedButtons ({searcher}: {searcher:Searcher}) {
  
  const search = useCallback(searcher,[searcher])
  const { setShowMoreFilters } = useContext(GlobalContext)
  const onClickReset = useCallback(()=>search(initialQuery),[search])
  const onClickSearch = useCallback(()=>setShowMoreFilters(false),[setShowMoreFilters])

  return (
    <div 
      className={styles.container} 
      style={{marginTop:`40px`, marginBottom:`10px`}}>

      <div 
        className={styles.advancedButton} 
        style={{width:'100px', marginRight:`5px`}} 
        onClick={onClickReset}>
          Reset
      </div>

      <div 
        className={styles.advancedButton}
        onClick={onClickSearch}>
        Search | Close
      </div>

    </div>  
  )
}
