import Logic from './Logic';
import { motion } from 'framer-motion'
import styles from './EpubReader.module.scss';
import animation from '../Animation/Animation';
import { GlobalContext } from './Context/GlobalContext';
import ControlPanel from './Components/Control Panel/ControlPanel';
import Canvas from './Components/Canvas';

export default function EpubReader() {

  const { globalValues }  = Logic();

  return (
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'>
        
      <GlobalContext.Provider value={globalValues}>
        <ControlPanel/>
        <Canvas/>
      </GlobalContext.Provider>

    </motion.div>
  )
}