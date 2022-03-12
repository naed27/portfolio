import styles from './AudioVisualizer.module.css'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import world from './CanvasPainter';
import { motion } from 'framer-motion'
import animation from './Animation';


const AudioVisualizer: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  const inputRef = useRef<HTMLInputElement>(null);
  
  const playButtonRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  const [audioTitle, setAudioTitle] = useState<String>('');
  const [playing, setPlaying] = useState<boolean>(false);

  const FileSelectedHandler = async (e:any) => {
    if (e.target.files[0]) {
      setAudioTitle(e.target.files[0].name.slice(0, -4))
    }
  }

  useEffect(() => {
    console.log('Audio Visualizer on Standby.');
    const cleaners = world(inputRef,canvasRef,containerRef,playButtonRef,progressLineRef,setPlaying);
    return ()=>{
      if(cleaners)
      cleaners();
    }
  },[setPlaying])
  
  return (
    
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
    >

      <div ref={containerRef} className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.canvas}/>
      </div>

      <div className={styles.controlContainer}>

        <div className={styles.progressBar}>
          <div ref={progressLineRef} className={styles.progressLine}></div>
        </div>

        <div className={styles.audioTitleBar}>
          <div className={styles.audioTitle}>{audioTitle}</div> 
        </div>
        

        <div className={styles.navigation}>
          <div className={styles.audioButton}>
            replay
          </div>
          
          <div ref={playButtonRef} className={styles.audioButton}>
            {playing&&'pause'}
            {!playing&&'play'}
          </div>

          <input id={'fileUpload'} ref={inputRef} type={'file'} accept={'audio/*'} onChange={FileSelectedHandler} />
          <label htmlFor="fileUpload" className={styles.audioButton}>upload</label> 
        </div>

      </div> 

    </motion.div>
  
  )
}

export default AudioVisualizer
