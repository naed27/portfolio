import { delay } from '../functions'
import styles from './LazyLoaderVertical.module.scss'
import { RefObject, useEffect, useMemo, useRef, useState } from 'react'

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

  useEffect(()=>{
    const topObserver = new IntersectionObserver(async ([target]) => {
      while(target.isIntersecting){
        if(!verticalThumbRef.current) break
        if(verticalThumbRef.current.getAttribute('data-mousedown')=='false'){
          topObserverCallback()
          break
        }else{
          await delay(50);
        }
      }
    },{
      root: observeRoot,
      rootMargin: `-100px`
    })

    const bottomObserver = new IntersectionObserver(async ([target]) => {
      while(target.isIntersecting){
        if(!verticalThumbRef.current) break
        if(verticalThumbRef.current.getAttribute('data-mousedown')=='false'){
          bottomObserverCallback()
          break
        }else{
          await delay(50);
        }
      }
    },{
      root: observeRoot,
      rootMargin: `100px`
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