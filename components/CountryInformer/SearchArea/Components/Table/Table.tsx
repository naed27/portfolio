import Card from './Card';
import styles from './Table.module.scss'
import { Country, SortMode } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { sortByName, sortByPopulation } from '../../../Utility/functions';

const ITEM_GAP = 20;
const CARD_WIDTH = 300;
const TABLE_PADDING = 10;

export default function Table () {

  const { searchedCountries, sortMode } = useContext(GlobalContext);
  const [JSXTable,setJSXTable] = useState<JSX.Element[]>([]);
  const [itemsPerRow, setItemsPerRow] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const render = useCallback((pool:Country[], itemsPerRow: number)=>{
    return [
      ...pool.splice(0,(itemsPerRow*5)).map((country,i)=>(
        <Card country={country} key={`tableItem_${i}_${country.area}`}/>
      )),
      ...invisibles
    ]
  },[invisibles])

  useEffect(()=>{
    const wender = () => {
      if(!wrapperRef.current) return
      const wrapper = wrapperRef.current
      const allowableWidth = wrapper.offsetWidth-(TABLE_PADDING*2);
      const cardsPerRow = getCardsPerRow({allowableWidth, cardWidth:CARD_WIDTH, itemGap:ITEM_GAP})
      setItemsPerRow(cardsPerRow)
    }
    wender();
    window.addEventListener('resize',wender)
    return () => window.removeEventListener('resize',wender)
  },[])

  useEffect(()=>{
    const table = render(pool,itemsPerRow)
    setJSXTable(table)
  },[ pool, render, itemsPerRow])

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


const getCardsPerRow = ({
  allowableWidth,
  cardWidth,
  itemGap,
}:{
  allowableWidth: number,
  cardWidth: number,
  itemGap: number,
}) =>{
  if(allowableWidth<CARD_WIDTH) return 1
  const cardsPerRow = Math.floor(allowableWidth/cardWidth)
  const gapped = (cardWidth*cardsPerRow) + (itemGap*(cardsPerRow-1))
  if (gapped<=allowableWidth)
    return cardsPerRow
  return cardsPerRow-1
}