import styles from './Styles/Field.module.scss'
import { Searcher } from '../../../../../Hooks/useSearcher';
import { GlobalContext } from '../../../../../../Context/context';
import { memo, useCallback, useContext, useMemo } from 'react'
import Menu from './Menu';

export default memo(Timezone)

function Timezone ({searcher}: {searcher: Searcher}) {
  
  const search = useCallback(searcher,[searcher]);
  const {query, countryClassifications} = useContext(GlobalContext);
  const timezones = useMemo(()=>countryClassifications.timezoneClassifications,[countryClassifications])
  
  const filterByTimezone = useCallback((input:string)=> search({timezone:input}),[search]);


  return (
    <div className={styles.container} >
    <div className={styles.label}>{`Timezone`}</div>
      <div className={styles.wrapper}>
        <Menu 
          className={styles.button} 
          title={'Timezones'}
          placeholder={query.timezone} 
          items={timezones} 
          itemHandler={filterByTimezone}/>
      </div>
    </div>  
  )
}


