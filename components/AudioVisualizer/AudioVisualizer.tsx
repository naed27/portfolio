import MENU from '../../lib/Menu'
import { motion } from 'framer-motion'
import { FunctionComponent } from 'react'
import animation from '../Animation/Animation'
import Canvas from './Components/Canvas/Canvas'
import styles from './AudioVisualizer.module.scss'
import Control from './Components/Control Menu/Control'
import { GlobalContext } from './Context/GlobalContext'
import AudioVisualizerLogic from './AudioVisualizerLogic'
import Metadata from '../Layout/Metadata/Metadata'

const metadata = (() => {
  const project = MENU.find((item)=>item.name === 'Audio Visualizer')
  return {
    img: project?.imgSrc || undefined,
    key: project?.link || '/audio-visualizer',
    title: project?.name || 'Audio Visualizer',
    desc: project?.name || 'Visualize your vibe!',
  }
})()

const AudioVisualizer: FunctionComponent = () => {
  const { globalValues }  = AudioVisualizerLogic();
  
  return (
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'>

      <Metadata
        key={metadata.key}
        pageTitle={metadata.title}
        description={metadata.desc}
        previewImage={metadata.img}
      />

      <GlobalContext.Provider value={globalValues}>
        <Canvas/>
        <Control/>
      </GlobalContext.Provider>
     
    </motion.div>
  )
}

export default AudioVisualizer
