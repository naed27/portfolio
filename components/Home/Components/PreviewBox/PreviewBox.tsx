import styles from './PreviewBox.module.scss'
import { motion } from 'framer-motion'

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
      duration:0.3
    }
  }
}

interface Props {
  src?: string,
  text?: string,
  afterAnimation?: () => void
};

const PreviewBox = ({src = '', text = '', afterAnimation = ()=>{}}: Props) => {

  return (
    <motion.div 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
      className={styles.container}>
      {(src.length > 0) ? <img 
        src={`${src}`}  
        alt={`preview image`} 
        style={{
          width: `100%`,
          height:'100%',
          objectFit: 'cover',
        }}
        />:<>{text}</>}
      {(src.length > 0) && <div className={styles.cover}/>}
    </motion.div>
  )
};

export default PreviewBox;