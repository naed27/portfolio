import Card from './Card';
import styles from './Table.module.scss'
import { Country, SortMode } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import LazyLoader from '../../../../../utility/LazyLoader/LazyLoader';
import { sortByName, sortByPopulation } from '../../../Utility/functions';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const ITEM_GAP = 20;
const CARD_WIDTH = 300;
const ROW_DISPLAY_MULTIPLIER = 8; // page will break if this goes below 8 (due to observer'S root margin)
const MAX_LAZYLOAD_MULTIPLIER = 4;
const WRAPPER_WIDTH_PADDING = 10;

export default function Table () {

  const { searchedCountries, sortMode } = useContext(GlobalContext);
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [itemsPerRow, setItemsPerRow] = useState(0);
  const [{startIndex, sliceOffset}, setSliceIndex] = useState({startIndex:0, sliceOffset:0});

  const sortBy = useCallback((countries: Country [], sortMode?: SortMode)=>{
    if(sortMode === 'Name') return sortByName(countries)
    return sortByPopulation(countries)
  },[])

  const pool = useMemo(()=>
    sortBy(searchedCountries,sortMode)
    .map((country) => <Card country={country} key={`item_${country.latlng[0]}_${country.latlng[1]}`}/>) 
  , [searchedCountries,sortBy,sortMode]);

  const invisibleChildren = useMemo(() => 
    Array.from({length:4},(_, i) => <div className={styles.invisible} key={`invChild_${i}`}/>), []);

  const topObserverCallback = useCallback(()=>{
    setSliceIndex(({startIndex}) => {
      const futureIndex = startIndex - (itemsPerRow*MAX_LAZYLOAD_MULTIPLIER)
      const newIndex = futureIndex < 0 ? 0 : futureIndex
      return {startIndex: newIndex, sliceOffset:0}
    })
  },[itemsPerRow])

  const bottomObserverCallback = useCallback(()=>{
    setSliceIndex(({startIndex}) => {

      let newIndex = 0;
      let offset = 0;

      const lengthOfLazyLoad = (itemsPerRow*MAX_LAZYLOAD_MULTIPLIER)
      const lengthOfDislayedItems = (itemsPerRow*ROW_DISPLAY_MULTIPLIER)
      
      const maximumCacheSize = pool.length
      const currentCacheSize = startIndex + lengthOfDislayedItems
      const remainingCache = maximumCacheSize - currentCacheSize
      const willExceed = (remainingCache < lengthOfLazyLoad)

      if(!willExceed){
        const futureIndex = startIndex + lengthOfLazyLoad;
        newIndex = futureIndex < 0 ? 0 : futureIndex
      }else{
        const lazyLoadMultiplier = Math.floor(remainingCache/itemsPerRow)
        const newLengthOfLazyLoad = itemsPerRow * lazyLoadMultiplier
        const futureIndex = startIndex + newLengthOfLazyLoad;
        newIndex = futureIndex < 0 ? 0 : futureIndex
        offset = remainingCache - newLengthOfLazyLoad
      }

      return {startIndex: newIndex, sliceOffset: offset}
    })
  },[itemsPerRow,pool])

  // ---------------- Count items per row
  useEffect(()=>{
    const determineCardCountPerRow = () => {
      if(!wrapperRef.current) return
      const wrapper = wrapperRef.current
      const allowableWidth = wrapper.offsetWidth-(WRAPPER_WIDTH_PADDING*2);
      const cardsPerRow = getCardsPerRow({allowableWidth, cardWidth:CARD_WIDTH, itemGap:ITEM_GAP})
      setItemsPerRow(cardsPerRow)
    }
    determineCardCountPerRow();
    window.addEventListener('resize',determineCardCountPerRow)
    return () => window.removeEventListener('resize',determineCardCountPerRow)
  },[])

  useEffect(() => setSliceIndex(() => ({startIndex:0, sliceOffset: 0})), [pool])

  const scrollResetDependencies = useMemo(()=>[ pool, itemsPerRow ] ,[itemsPerRow, pool])

  return (
    <div className={styles.section}>
      <ScrollableDiv 
        customRef={scrollDivRef} 
        scrollY={{thumbOpacity:0}}
        className={styles.container} 
        dependencies={scrollResetDependencies}>

        <LazyLoader 
          customRef={observerRef}
          observeRoot={scrollDivRef.current}
          topObserverCallback={topObserverCallback}
          bottomObserverCallback={bottomObserverCallback}>

          <div ref={wrapperRef} className={styles.wrapper}>
            {pool.slice(startIndex, startIndex+(itemsPerRow*ROW_DISPLAY_MULTIPLIER)+sliceOffset)}
            {invisibleChildren}
          </div>

        </LazyLoader>
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