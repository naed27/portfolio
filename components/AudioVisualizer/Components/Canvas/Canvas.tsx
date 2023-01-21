import { useContext } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import styles from './Canvas.module.scss'

export default function Canvas () {
  
  const { containerRef, canvasRef } = useContext(GlobalContext);
  
  return (
  <div className={styles.container}>
    <div ref={containerRef}  className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas}/>
    </div>
  </div>
  )
}