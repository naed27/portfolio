
import { useCallback } from 'react';
import useSearcher from '../../Hooks/useSearcher';
import MoreFiltersToggler from './Components/MoreFiltersToggler/MoreFiltersToggler'
import SimpleFilter from './Components/SimpleFilter/SimpleFilter'
import styles from './Filter.module.scss'

export default function Filter () {


  const { search } = useSearcher();
  const searcher = useCallback(search,[search])

  return (
    <div className={styles.container}>
        <SimpleFilter searcher={searcher}/>
        <MoreFiltersToggler/>
    </div>
  )

}