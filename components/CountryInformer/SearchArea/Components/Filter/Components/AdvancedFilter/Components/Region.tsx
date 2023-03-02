import styles from './Styles/Field.module.scss'
import { Searcher } from '../../../../../Hooks/useSearcher';
import { GlobalContext } from '../../../../../../Context/context';
import { memo, useCallback, useContext, useMemo } from 'react'
import Menu from './Menu';

function Region ({searcher}: {searcher: Searcher}) {
  
  const search = useCallback(searcher,[searcher]);
  const {query, countryClassifications} = useContext(GlobalContext);
  const regions = useMemo(()=>countryClassifications.regionClassifications,[countryClassifications])
  
  const filterByRegion = useCallback((input:string)=> search({region:input}),[search]);

  return (
    <div className={styles.container} >
    <div className={styles.label}>{`Region`}</div>
      <div className={styles.wrapper}>
        <Menu 
          className={styles.button} 
          title={'Regions'}
          placeholder={query.region} 
          items={regions} 
          itemHandler={filterByRegion}/>
      </div>
    </div>  
  )
}

export default memo(Region)


