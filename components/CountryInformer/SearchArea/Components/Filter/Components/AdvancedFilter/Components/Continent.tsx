import styles from './Styles/Field.module.scss'
import { Searcher } from '../../../../../Hooks/useSearcher';
import { GlobalContext } from '../../../../../../Context/context';
import { useCallback, useContext, useMemo } from 'react'
import Menu from './Menu';

export default function Continent ({searcher}: {searcher: Searcher}) {
  
  const search = useCallback(searcher,[searcher]);
  const {query, countryClassifications} = useContext(GlobalContext);
  const {continentsClassifications } =  countryClassifications;
  const continents = useMemo(()=>continentsClassifications,[continentsClassifications])
  
  const filterContinent = useCallback((input:string)=> search({continent:input}),[search]);

  return (
    <div className={styles.container} >
    <div className={styles.label}>{`Continent`}</div>
      <div className={styles.wrapper}>
        <Menu 
          className={styles.button} 
          title={'Continents'}
          placeholder={query.continent} 
          items={continents} 
          itemHandler={filterContinent}/>
      </div>
    </div>  
  )
}


