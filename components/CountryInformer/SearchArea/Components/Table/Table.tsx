import Card from './Card';
import styles from './Table.module.scss'
import { Country, SortMode } from '../../../Types/types';
import { GlobalContext } from '../../../Context/context';
import LazyLoaderVertical from '../../../../../utility/LazyLoader/LazyLoaderVertical';
import { sortByName, sortByPopulation } from '../../../Utility/functions';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const ITEM_GAP = 20;
const CARD_WIDTH = 300;
const CARD_HEIGHT = 140;
const ROW_DISPLAY_MULTIPLIER = 8; // page will break if this goes below 8 (due to observer's root margin)
const WRAPPER_WIDTH_PADDING = 10;

export default function Table () {

  const { searchedCountries, sortMode } = useContext(GlobalContext);
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lazyLoaderRef = useRef<HTMLDivElement>(null);
  const verticalThumbRef = useRef<HTMLDivElement>(null);
  const topObserverRef = useRef<HTMLDivElement>(null);
  const bottomObserverRef = useRef<HTMLDivElement>(null);
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

  const scrollTrackUpdater = useCallback(({ newIndex, itemsPerRow }:{ newIndex: number, itemsPerRow: number })=>{
    if(lazyLoaderRef.current && topObserverRef.current && bottomObserverRef.current){
      const previousContainerHeight = lazyLoaderRef.current.offsetHeight;
      const rowsGone = newIndex/itemsPerRow
      const displayHeight = ROW_DISPLAY_MULTIPLIER*(CARD_HEIGHT+ITEM_GAP)+20;
      const newTopPadding = (rowsGone*(CARD_HEIGHT+ITEM_GAP)); 
      topObserverRef.current.style.height = `${newTopPadding}px`;
      const newBottomPaddingEstimation = (previousContainerHeight)-(displayHeight+newTopPadding);
      const newBottomPadding = newBottomPaddingEstimation < 0 ? 0: newBottomPaddingEstimation;
      bottomObserverRef.current.style.height = `${newBottomPadding}px`;
    }
  },[])

  const observerCallback = useCallback(async ()=>{
    setSliceIndex(() => {
      const currentSrollPos = scrollDivRef.current ? scrollDivRef.current.scrollTop: 0;
      const observerFrame = (currentSrollPos <= 100) ? currentSrollPos : currentSrollPos - 100;
      const cardHeight = CARD_HEIGHT + ITEM_GAP;
      const newIndex = Math.floor(observerFrame/cardHeight)*itemsPerRow;
      scrollTrackUpdater({newIndex, itemsPerRow})
      return {startIndex: newIndex, sliceOffset: 0}
    })
  },[scrollTrackUpdater, itemsPerRow])

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

  useEffect(() => {
    setSliceIndex(() => {
      if(topObserverRef.current && bottomObserverRef.current){
        const rowsCount = Math.ceil(pool.length/itemsPerRow)
        const cardHeight = (CARD_HEIGHT+ITEM_GAP);
        const containerHeight = (rowsCount*cardHeight)+20;
        const displayHeight = ROW_DISPLAY_MULTIPLIER*(CARD_HEIGHT+ITEM_GAP)+20;
        const bottomPaddingEstimation = containerHeight-displayHeight
        topObserverRef.current.style.height = `0px`;
        bottomObserverRef.current.style.height = `${bottomPaddingEstimation > 0 ? bottomPaddingEstimation : 0}px`;
      }

      scrollTrackUpdater({newIndex:0, itemsPerRow})
      return ({startIndex:0, sliceOffset: 0})
    })
  }, [pool, itemsPerRow, scrollTrackUpdater])

  const scrollResetDependencies = useMemo(()=>[ pool, itemsPerRow ] ,[itemsPerRow, pool])
  const scrollTrackDependencies = useMemo(()=>[ startIndex ] ,[startIndex])

  return (
    <div className={styles.section}>
      <ScrollableDiv 
        customRef={scrollDivRef} 
        scrollY={{thumbOpacity:1, thumbColor:'gray'}}
        className={styles.container} 
        thumbRef={{vertical: verticalThumbRef}}
        dependencies={scrollResetDependencies}
        trackDependencies={scrollTrackDependencies}>
        <LazyLoaderVertical 
          customRef={lazyLoaderRef}
          observeRoot={scrollDivRef.current}
          verticalThumbRef={verticalThumbRef}
          topObserverCallback={observerCallback}
          bottomObserverCallback={observerCallback}
          observerRefs={{ top:topObserverRef, bottom:bottomObserverRef }}>
          <div ref={wrapperRef} className={styles.wrapper}>
            {pool.slice(startIndex, startIndex+(itemsPerRow*ROW_DISPLAY_MULTIPLIER)+sliceOffset)}
            {invisibleChildren}
          </div>
        </LazyLoaderVertical>
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