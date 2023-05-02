import styles from './NavBar.module.scss'
import { motion } from 'framer-motion'
import animation from './Animation'
import { useContext } from 'react'
import { LayoutContext } from '../Context/LayoutContext'
import HomeButton from '../Buttons/Home/HomeButton'

export default function NavBar () {
  
  const {absoluteNavBar} = useContext(LayoutContext)
  
  return (
    <motion.div className={styles.container}
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'

      style={{ position: absoluteNavBar ? 'absolute' : 'relative' }}
      >

      <div className={styles.fixed}>
        <HomeButton/>
      </div>

    </motion.div> 
  )
}
