import styles from '../Styles/Table.module.css'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Card from './Card';
import { GlobalContext } from '../../../Misc/globalContext';
import { YGOCard } from '../../../Misc/globalTypes';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';

export default function Table () {
  
  const {searchedCards,pageNumber} = useContext(GlobalContext);
  const [table,setTable] = useState<JSX.Element[]>([]);
  const pool = useMemo(()=>searchedCards,[searchedCards]);

  const render = useCallback((pool:YGOCard[],currentPageNumber:number)=>{
    const range = 20;
    const start = (currentPageNumber-1)*range;
    const end = start+range;
    return pool.slice(start,end).map((card)=>(<Card card={card} key={`table_item_${card.id}`} />));
  },[])

  useEffect(()=>{
    const table = render(pool,pageNumber);
    setTable(table);
  },[  pageNumber, pool, render ]);

  return (
    <ScrollableDiv className={styles.container} dependencies={[searchedCards]}>
      <div className={styles.wrapper}>
        {table}
      </div>
    </ScrollableDiv>   
  )
}