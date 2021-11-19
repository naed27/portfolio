import styles from '../Styles/Table.module.css'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Card from './Card';
import { GlobalContext } from '../../../Misc/Context';
import { YGOCard } from '../../../Misc/Types';

const Table = () => {
  
  const {searchedCards,pageNumber,setPageCardCount} = useContext(GlobalContext);
  const [table,setTable] = useState<JSX.Element[]>([]);
  const pool = useMemo(()=>searchedCards,[searchedCards]);

  const render = useCallback((pool:YGOCard[],pageNumber:number)=>{
    const range = 20;
    const start = (pageNumber-1)*range;
    const end = start+range;
    return pool.slice(start,end).map((card)=>(<Card card={card} key={`table_item_${card.id}`} />));
  },[])

  useEffect(()=>{
    const table = render(pool,pageNumber);
    setTable(table);
    setPageCardCount(table.length);
  },[ pageNumber,pool,setPageCardCount,render]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {table}
      </div>
    </div>   
  )

}

export default Table
