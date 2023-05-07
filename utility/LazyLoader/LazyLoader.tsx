
import { ForwardedRef, RefObject, forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import styles from './LazyLoader.module.scss'

interface Props {
  children: React.ReactNode,
  observeRoot: HTMLDivElement | null,
  topObserverCallback: () => void,
  bottomObserverCallback: () => void,
  customRef?: RefObject<HTMLDivElement>,
}

interface TableObservers {
  top: IntersectionObserver|null,
  bottom: IntersectionObserver|null
}

const LazyLoader = ({
  children, 
  customRef,
  observeRoot, 
  topObserverCallback, 
  bottomObserverCallback }: Props) => {

  const defaultRef = useRef<HTMLDivElement>(null);
  const observerRef = useMemo(()=> customRef || defaultRef,[customRef])

  const [tableObservers, setTableObservers] = useState<TableObservers>({ top: null, bottom: null });

  useEffect(()=>{
    
    const observerOptions = { root: observeRoot, rootMargin: `100px` }

    const topObserver = new IntersectionObserver(([target]) => {
      if(!target.isIntersecting) return
      topObserverCallback()
    },observerOptions)

    const bottomObserver = new IntersectionObserver(([target]) => {
      if(!target.isIntersecting) return
      bottomObserverCallback()
    },observerOptions)

    setTableObservers((observers)=>{
      const {top, bottom} = observers;
      top && top.disconnect();
      bottom && bottom.disconnect();
      return {top: topObserver, bottom: bottomObserver}
    })

    if(!observerRef.current) return;

    const {firstElementChild, lastElementChild} = observerRef.current
    firstElementChild && topObserver.observe(firstElementChild);
    lastElementChild && bottomObserver.observe(lastElementChild);


    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    }

  },[topObserverCallback, bottomObserverCallback, observerRef, observeRoot])

  return (
    <div className={styles.container} ref={observerRef}>
      <div className={styles.observer}/>

        {children}

      <div className={styles.observer}/>
    </div>
  )
}

export default LazyLoader