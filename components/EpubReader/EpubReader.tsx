import Logic from './Logic';
import { motion } from 'framer-motion';
import styles from './EpubReader.module.scss';
import animation from '../Animation/Animation';
import NavBar from './Components/Nav Bar/NavBar';
import { GlobalContext } from './Context/GlobalContext';
import Frame from './Components/Frame/Frame';

export default function EpubReader() {

  const { globalValues }  = Logic();

  return (
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'>
        
      <GlobalContext.Provider value={globalValues}>
        <NavBar/>
        <Frame/>
      </GlobalContext.Provider>

    </motion.div>
  )
}