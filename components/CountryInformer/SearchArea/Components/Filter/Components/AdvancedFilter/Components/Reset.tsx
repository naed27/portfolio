import styles from './Styles/Field.module.scss'
import { memo, useCallback, useContext, } from 'react'
import { Searcher } from '../../../../../Hooks/useSearcher';
import { GlobalContext } from '../../../../../../Context/context';
import { initialQuery } from '../../../../../../Utility/initializers';


export default memo(Reset)

function Reset ({searcher}: {searcher: Searcher}) {
  
  const search = useCallback(searcher,[searcher]);
  const { setShowMoreFilters } = useContext(GlobalContext);
  const onClickSearch = useCallback(()=>setShowMoreFilters(false),[setShowMoreFilters])
  const onClickReset = useCallback(()=>search(initialQuery),[search])

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
