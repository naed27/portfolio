import animation from '../Animation/Animation';
import { motion } from 'framer-motion'
import Canvas from './Components/Canvas/Canvas';
import styles from './AudioVisualizer.module.scss'
import Control from './Components/Control Menu/Control';
import { GlobalContext } from './Context/GlobalContext';
import AudioVisualizerLogic from './AudioVisualizerLogic';
import { FunctionComponent } from 'react';

const AudioVisualizer: FunctionComponent = () => {
  const { globalValues }  = AudioVisualizerLogic();
  
  return (
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'>

      <GlobalContext.Provider value={globalValues}>
        <Canvas/>
        <Control/>
      </GlobalContext.Provider>
     
    </motion.div>
  )
}

export default AudioVisualizer
