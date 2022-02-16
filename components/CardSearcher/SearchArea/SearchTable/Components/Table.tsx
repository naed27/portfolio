import styles from '../Styles/Table.module.css'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Card from './Card';
import { GlobalContext } from '../../../Misc/globalContext';
import { YGOCard } from '../../../Misc/globalTypes';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';

export default function Table () {
  
  const {searchedCards,pageNumber,setMaxPageOfTable,tablePageRange} = useContext(GlobalContext);
  const [JSXTable,setJSXTable] = useState<JSX.Element[]>([]);
  const pool = useMemo(()=>searchedCards,[searchedCards]);

  const render = useCallback((pool:YGOCard[],currentPageNumber:number)=>{
    const range = 20;
    const start = (currentPageNumber-1)*range;
    const end = start+range;
    const cardWidth = 47.34;
    const cardHeight = cardWidth*1.465;
    const cardSize = {width:cardWidth, height:cardHeight};

    return pool.slice(start,end).map((card)=>(<Card card={card} key={`table_item_${card.id}`} cardSize={cardSize}/>));
  },[])

  const calcMaxPage = useCallback((tablePageRange, searchedCards) => {
    if(searchedCards.length === 0) return 1;
    if(searchedCards.length < tablePageRange) return 1

    if(searchedCards.length % tablePageRange === 0) 
      return searchedCards.length/tablePageRange
    return Math.floor(searchedCards.length/tablePageRange)+1;
  },[])

  useEffect(()=>{
    const table = render(pool,pageNumber);
    setJSXTable(table);
  },[  pageNumber, pool, render,]);

  useEffect(()=>{
    setMaxPageOfTable(calcMaxPage(tablePageRange,searchedCards))
  },[ tablePageRange, setMaxPageOfTable, searchedCards, calcMaxPage ])

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