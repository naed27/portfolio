import styles from '../Styles/Table.module.scss'
import { useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react'
import Card from './Card';
import { GlobalContext } from '../../../Misc/globalContext';
import { YGOCard } from '../../../Misc/globalTypes';
import { getMaxPageCount } from '../../../../../utility/functions';
import useItemsPerColumn from '../../../../../hooks/useItemsPerColumn';
import useItemsPerRow from '../../../../../hooks/useItemsPerRow';

const FLEX_GAP = 0;
const ITEM_WIDTH_BASIS = 280;
const ITEM_HEIGHT_BASIS = 60;

export default function Table () {
  
  const {searchedCards,pageNumber,setMaxPageOfTable} = useContext(GlobalContext);

  const containerRef = useRef<HTMLDivElement>(null)
  const [JSXTable,setJSXTable] = useState<JSX.Element[]>([]);
  const pool = useMemo(()=>searchedCards,[searchedCards]);
  const itemsPerRow = useItemsPerRow({cardWidth: ITEM_WIDTH_BASIS, flexGap: FLEX_GAP, containerRef})
  const itemsPerColumn = useItemsPerColumn({cardHeight: ITEM_HEIGHT_BASIS, flexGap: FLEX_GAP, containerRef})

  const render = useCallback((pool:YGOCard[],currentPageNumber:number)=>{
    if(!containerRef.current) return []
    const containerHeight = containerRef.current.offsetHeight
    const range = itemsPerColumn*itemsPerRow;
    const start = (currentPageNumber-1) * range;
    const end = start + range;
    const cardHeight = containerHeight/itemsPerColumn;
    const cardWidth = cardHeight*0.68566775244;
    const cardSize = {width:cardWidth, height:cardHeight};

    return [
      ...pool.slice(start,end).map((card)=>(<Card card={card} key={`table_item_${card.id}`} cardSize={cardSize}/>)),
      <Card key='ygo_invi_1' cardSize={{...cardSize,height:0}}/>,
      <Card key='ygo_invi_2' cardSize={{...cardSize,height:0}}/>,
      <Card key='ygo_invi_3' cardSize={{...cardSize,height:0}}/>,
      <Card key='ygo_invi_4' cardSize={{...cardSize,height:0}}/>,
    ]
  },[itemsPerColumn, itemsPerRow])


  useEffect(()=>{
    const table = render(pool,pageNumber);
    setJSXTable(table);
  },[  pageNumber, pool, render ]);

  useEffect(()=>{
    setMaxPageOfTable(getMaxPageCount({
      displayCount: itemsPerColumn*itemsPerRow, 
      totalItemCount: searchedCards.length
    }))
  },[ setMaxPageOfTable, searchedCards, itemsPerColumn, itemsPerRow ])

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.wrapper}>
        {JSXTable}
      </div>
    </div>   
  )
}