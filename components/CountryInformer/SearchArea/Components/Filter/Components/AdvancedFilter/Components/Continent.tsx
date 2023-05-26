import styles from './Styles/Field.module.scss'
import { Searcher } from '../../../../../Hooks/useSearcher';
import { GlobalContext } from '../../../../../../Context/context';
import { memo, useCallback, useContext, useMemo } from 'react'
import Menu from '../../../../../../../../utility/Menu/Menu';

export default memo(Continent)

function Continent ({searcher}: {searcher: Searcher}) {
  
  const search = useCallback(searcher,[searcher]);
  const {query, countryClassifications} = useContext(GlobalContext);
  const continents = useMemo(()=>countryClassifications.continentsClassifications,[countryClassifications])
  
  const filterByContinent = useCallback((input:string)=> search({continent:input}),[search]);

  return (
    <div className={styles.container} >
    <div className={styles.label}>{`Continent`}</div>
      <div className={styles.wrapper}>
        <Menu 
          className={styles.button} 
          title={'Continents'}
          placeholder={query.continent} 
          items={continents} 
          itemHandler={filterByContinent}/>
      </div>
    </div>  
  )
}


