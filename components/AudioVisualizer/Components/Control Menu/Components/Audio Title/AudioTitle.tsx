import { useCallback, useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './AudioTitle.module.scss'

export default function AudioTitle () {
  
  const { audioTitle } = useContext(GlobalContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const fitTitle = useCallback(() => {
    if(!containerRef.current||!textRef.current) return
    const text = textRef.current
    const container = containerRef.current
    if (container.clientWidth < text.clientWidth){
      text.classList.add(styles.animate)
      container.style.justifyContent = ''
    }
    else {
      text.classList.remove(styles.animate)
      container.style.justifyContent = 'center'
    }
  },[])

  useEffect(()=>{
    fitTitle()
    window.addEventListener('resize',fitTitle)
    
    return () => window.removeEventListener('resize',fitTitle)
  },[fitTitle])
  
  return (
    <div ref={containerRef} className={styles.container}>
        <span ref={textRef}>
          {(audioTitle === null) ? 'No file' : audioTitle}
        </span>  
        <div className={`${styles.fader} ${styles.faderLeft}`}></div>
        <div className={`${styles.fader} ${styles.faderRight}`}></div>
    </div>
  )
}