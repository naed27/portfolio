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
  const tableRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

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

  const onScrollHandler = useCallback(()=>{
    if(!tableRef.current) return
    if(!wrapperRef.current) return
    const table = tableRef.current
    const wrapper = wrapperRef.current

    const wrapperRange = wrapper.offsetHeight-table.offsetHeight
    const tablePoint = table.scrollTop
    const percentage = tablePoint/wrapperRange*100
    // console.log(percentage)
  },[])


  useEffect(()=>{
    const table = render(pool)
    setJSXTable(table)
  },[ pool, render,])

  return (
    <div className={styles.section} >
      <ScrollableDiv onScroll={onScrollHandler} customRef={tableRef} className={styles.container} dependencies={JSXTable} scrollY={{thumbColor:'white'}}>
        <div ref={wrapperRef} className={styles.wrapper}>
          {JSXTable}
        </div>
      </ScrollableDiv>   
    </div>
  )

}