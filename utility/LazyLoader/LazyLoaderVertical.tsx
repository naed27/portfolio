import { getCoordinates } from '../functions'
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
  baseY: number | null, 
  baseCounter: number, 
  callback: ()=> void, 
  scrollThumbRef: RefObject<HTMLDivElement>
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

  const [observeTimeout, setObserveTimeout] = useState<NodeJS.Timeout|null>(null);
  const [tableObservers, setTableObservers] = useState<TableObservers>({ top: null, bottom: null });

  const observerUpdater = useCallback(({baseCounter, baseY, callback, scrollThumbRef}: observeCache)=>{
      if(!scrollThumbRef.current) return ({ newCounter:0, delay:0, repeat: false, newY:0 })
      const { y: newY } = getCoordinates(scrollThumbRef.current)
      if(scrollThumbRef.current.getAttribute('data-mousedown')=='false'){
        if(baseCounter < 1){
          if(baseY != newY){
            callback()
            baseCounter = 0
          }else{
            baseCounter ++
          }
          return ({newCounter: baseCounter, delay:500, repeat: true, newY})
        }
        return ({newCounter: baseCounter, delay:0, repeat: false, newY})
      }
      return ({newCounter: baseCounter, delay:50, repeat: true, newY: baseY})
  },[])

  const lazyObserver = useCallback(({ root, rootMargin, callback, scrollThumbRef }:LazyObserverProps)=>{
    return new IntersectionObserver(async ([target]) => {

      let y = null
      let counter = 0

      const {newCounter, newY, delay} = observerUpdater({
        baseY: y,
        callback,
        scrollThumbRef,
        baseCounter: counter,
      })

      const loop = ({baseCounter, baseY, callback, scrollThumbRef}: observeCache, delay: number) => {
        setObserveTimeout((current)=>{
          if(current)clearTimeout(current)
          return (setTimeout(()=>{
            const {newCounter, repeat, delay, newY} = observerUpdater({
              baseY,
              callback,
              baseCounter,
              scrollThumbRef,
            })
  
            const y = newY
            const counter = newCounter

            if(repeat) loop({ callback, baseY: newY, scrollThumbRef, baseCounter: newCounter },delay) 
          }, delay))
        })
      }

      if(target.isIntersecting)
        loop({
          callback,
          baseY: newY,
          scrollThumbRef,
          baseCounter: newCounter,
        },delay)
      
    },{ root, rootMargin })
  },[observerUpdater])


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