import Letterbox from './Components/Letterbox'
import styles from './Header.module.scss'
import { motion } from 'framer-motion'

const animation = {
  initial:{
    opacity:0
  },
  final:{
    opacity:1,
    transition:{
      duration:1
    }
  },
  exit:{
    opacity:0,
    transition:{
      duration:0.4
    }
  }
}

const Header = ({label} : {label: string}) => {

  return  (
    <motion.div 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
      className={styles.container}>
      {(()=>{
        let letters = []
        for (let i = 0; i < label.length; i++) {
          letters.push(<Letterbox letter={label[i].toUpperCase()} key={`header_letter_${i}`}/>)
        }
        return letters
      })()}
    </motion.div>
  )
}

export default Header