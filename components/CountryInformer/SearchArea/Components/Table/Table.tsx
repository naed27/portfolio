import Card from './Card';
import styles from './Table.module.scss'
import { Country, SortMode } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { sortBy } from 'lodash';
import { sortByName, sortByPopulation } from '../../../Utility/functions';

export default function Table () {

  const { searchedCountries, sortMode } = useContext(GlobalContext);
  const [JSXTable,setJSXTable] = useState<JSX.Element[]>([]);

  const sortBy = useCallback((countries: Country [], sortMode?: SortMode)=>{
    if(sortMode === 'Name') return sortByName(countries)
    return sortByPopulation(countries)
  },[])

  const pool = useMemo(()=>{
    return sortBy(searchedCountries,sortMode)
  },[searchedCountries,sortBy,sortMode]);

  const render = useCallback((pool:Country[])=>{
    return [
      ...pool.map((country,i)=>(
        <Card country={country} key={`tableItem_${i}_${country.area}`}/>
      )),
    ]
  },[])


  useEffect(()=>{
    const table = render(pool)
    setJSXTable(table)
  },[ pool, render,])

  return (
    <div className={styles.section} >
      <ScrollableDiv className={styles.container} dependencies={JSXTable} scrollY={{thumbColor:'black'}}>
        <div className={styles.wrapper}>
          {JSXTable}
        </div>
      </ScrollableDiv>   
    </div>
  )

}