import { Dna } from 'react-loader-spinner'
import styles from './LoadingPage.module.scss'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

const animation = {
  initial:{
    opacity:0
  },
  final:{
    opacity:1,
    transition:{
      duration:0.5
    }
  },
  exit:{
    opacity:0,
    transition:{
      duration:0.5
    }
  }
}

const LoadingPage = () => {
  return (
    <motion.div 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
      className={styles.container} key={`${uuidv4()}`}>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </motion.div>
  )
}

export default LoadingPage