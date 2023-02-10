import Card from './Card';
import styles from './Table.module.scss'
import { Country } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';

export default function Table () {

  const { searchedCountries } = useContext(GlobalContext);
  const [JSXTable,setJSXTable] = useState<JSX.Element[]>([]);
  const pool = useMemo(()=>searchedCountries,[searchedCountries]);

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
      <ScrollableDiv className={styles.container} dependencies={JSXTable}>
        <div className={styles.wrapper}>
          {JSXTable}
        </div>
      </ScrollableDiv>   
    </div>
  )

}