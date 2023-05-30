import styles from './Sphere.module.scss'
import { ReactEventHandlers } from 'react-use-gesture/dist/types'
import { ReactNode, RefObject, useRef, useMemo, CSSProperties } from 'react'
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

interface Props {
  children: ReactNode,
  cssStyle?: CSSProperties
  customRef?: RefObject<HTMLDivElement>,
  reactGestureBinder?: ((...args: any[]) => ReactEventHandlers) | (()=>void)
};

const Sphere = ({children, customRef, reactGestureBinder = ()=>{}, cssStyle={}}: Props) => {

  const defaultContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useMemo(()=> customRef || defaultContainerRef, [customRef])

  return (
      <motion.div 
        variants={animation}
        initial='initial'
        animate='final'
        exit='exit'
        style={cssStyle}
        ref={containerRef} 
        className={styles.container} {...reactGestureBinder()}>

          {children}

      </motion.div> 
  )
};

export default Sphere;