import { motion } from 'framer-motion'
import { FunctionComponent } from 'react'
import animation from '../Animation/Animation'
import Canvas from './Components/Canvas/Canvas'
import styles from './AudioVisualizer.module.scss'
import Control from './Components/Control Menu/Control'
import { GlobalContext } from './Context/GlobalContext'
import AudioVisualizerLogic from './AudioVisualizerLogic'
import Metadata from '../Layout/Metadata/Metadata'

const AudioVisualizer: FunctionComponent = () => {
  const { globalValues }  = AudioVisualizerLogic();
  
  return (
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'>

      <Metadata
        key={'/projects/audio-visualizer'}
        pageTitle={'Audio Visualizer'}
        description={'Watch as sounds come to life!'}
        previewImage={'https://cdn.discordapp.com/attachments/1112753458165063701/1112761209339519006/image.png'}
      />

      <GlobalContext.Provider value={globalValues}>
        <Canvas/>
        <Control/>
      </GlobalContext.Provider>
     
    </motion.div>
  )
}

export default AudioVisualizer
