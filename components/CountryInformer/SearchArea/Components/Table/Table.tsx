import Card from './Card';
import styles from './Table.module.scss'
import { Country, SortMode } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { sortByName, sortByPopulation } from '../../../Utility/functions';

export default function Table () {

  const { searchedCountries, sortMode } = useContext(GlobalContext);
  const [JSXTable,setJSXTable] = useState<JSX.Element[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null)

  const sortBy = useCallback((countries: Country [], sortMode?: SortMode)=>{
    if(sortMode === 'Name') return sortByName(countries)
    return sortByPopulation(countries)
  },[])

  const pool = useMemo(()=>sortBy(searchedCountries,sortMode),[searchedCountries,sortBy,sortMode]);

  const invisibles = useMemo(()=>{
    const invis = []
    for (let i = 0; i < 4; i++) 
      invis.push(<Card invisibleChild={true} key={`tableInvi_${i}`}/>)
    return invis
  },[])

  const render = useCallback((pool:Country[])=>{
    return [
      ...pool.map((country,i)=>(
        <Card country={country} key={`tableItem_${i}_${country.area}`}/>
      )),
      ...invisibles
    ]
  },[invisibles])

  useEffect(()=>{
    const table = render(pool)
    setJSXTable(table)
  },[ pool, render,])

  return (
    <div className={styles.section} >
      <ScrollableDiv className={styles.container} dependencies={JSXTable} scrollY={{thumbColor:'white'}}>
        <div ref={wrapperRef} className={styles.wrapper}>
          {JSXTable}
        </div>
      </ScrollableDiv>   
    </div>
  )

}