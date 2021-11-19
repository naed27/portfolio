import styles from './MovingBox.module.css'
import { FunctionComponent, useEffect,useRef } from 'react'
import world from './World';
import { motion } from 'framer-motion'
import animation from './Animation';


const MovingBox: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 

  useEffect(() => {
    const cleaners:{ (): void }[] = world(canvasRef,containerRef);
    return ()=>{
      cleaners.forEach(cleaner => {cleaner()});
    }
  },[canvasRef,containerRef])
  
  return (
    
      <motion.div ref={containerRef} className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
      >
        <canvas ref={canvasRef} className={styles.canvas}/>
      </motion.div>
    
  )
}

export default MovingBox
