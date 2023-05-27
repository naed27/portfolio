import { delay, getCoordinates } from '../functions'
import styles from './LazyLoaderVertical.module.scss'
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode,
  observeRoot: HTMLDivElement | null,
  topObserverCallback: () => void,
  bottomObserverCallback: () => void,
  customRef?: RefObject<HTMLDivElement>,
  observerRefs?: {
    top?: RefObject<HTMLDivElement>,
    bottom?: RefObject<HTMLDivElement>,
  },
  verticalThumbRef:RefObject<HTMLDivElement>,
}

interface TableObservers {
  top: IntersectionObserver|null,
  bottom: IntersectionObserver|null
}

interface LazyObserverProps{
  root: Element | Document | null | undefined, 
  rootMargin: string | undefined, 
  callback: () => void, 
  scrollThumbRef: RefObject<HTMLDivElement>
}

type observerFunction = (counter: number, previousY: number, thumbRef: RefObject<HTMLDivElement>) => {
  break: boolean;
  counter: number;
  delay: number;
}

interface observeCache {
  id: string | null,
  callback: observerFunction | null
}

const LazyLoaderVertical = ({
  children, 
  customRef,
  observeRoot, 
  verticalThumbRef,
  observerRefs = {top: undefined, bottom: undefined},
  topObserverCallback, 
  bottomObserverCallback }: Props) => {

  const defaultContainerRef = useRef<HTMLDivElement>(null);
  const defaultTopObserverRef = useRef<HTMLDivElement>(null);
  const defaultBottomObserverRef = useRef<HTMLDivElement>(null);
  const containerRef = useMemo(()=> customRef || defaultContainerRef, [customRef])
  const topObserverRef = useMemo(()=> observerRefs.top || defaultTopObserverRef, [observerRefs])
  const bottomObserverRef = useMemo(()=> observerRefs.bottom || defaultBottomObserverRef, [observerRefs])

  const [tableObservers, setTableObservers] = useState<TableObservers>({ top: null, bottom: null });

  const lazyObserver = useCallback(({ root, rootMargin, callback, scrollThumbRef }:LazyObserverProps)=>{
    return new IntersectionObserver(async ([target]) => {
      let counter = 0;
      let currentY = null;
      let previousY = null;
      while(target.isIntersecting) {
        if(!scrollThumbRef.current) break
        if(scrollThumbRef.current.getAttribute('data-mousedown')=='false'){
          currentY = getCoordinates(scrollThumbRef.current).y
          if(counter < 2){
            if(previousY!=currentY){
              callback()
              counter ++;
              await delay(300);
            }else{
              counter = 0
            }
          }
          if(counter==2)
            break
        }else{
          await delay(50);
        }
      }
    },{ root, rootMargin })
  },[])

  useEffect(()=>{

    const topObserver = lazyObserver({
      root: observeRoot, 
      rootMargin: `-100px`, 
      callback: topObserverCallback, 
      scrollThumbRef: verticalThumbRef
    })

    const bottomObserver = lazyObserver({
      root: observeRoot, 
      rootMargin: `100px`, 
      callback: bottomObserverCallback, 
      scrollThumbRef: verticalThumbRef
    })
    
    setTableObservers((observers)=>{
      const {top, bottom} = observers;
      top && top.disconnect();
      bottom && bottom.disconnect();
      return {top: topObserver, bottom: bottomObserver}
    })

    if(!containerRef.current) return;

    const {firstElementChild, lastElementChild} = containerRef.current
    firstElementChild && topObserver.observe(firstElementChild);
    lastElementChild && bottomObserver.observe(lastElementChild);
    
    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    }

  },[
    observeRoot, 
    containerRef, 
    topObserverRef, 
    verticalThumbRef, 
    bottomObserverRef, 
    topObserverCallback, 
    bottomObserverCallback, 
    lazyObserver
  ])

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.observer} ref={topObserverRef}/>

        {children}

      <div className={styles.observer} ref={bottomObserverRef}/>
    </div>
  )
}

export default LazyLoaderVertical