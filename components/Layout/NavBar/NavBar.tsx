import styles from './NavBar.module.scss'
import BurgerButton from '../Burger/Button/BurgerButton'
import { motion } from 'framer-motion'
import animation from './Animation'
import { useContext } from 'react'
import { LayoutContext } from '../Context/LayoutContext'

export default function NavBar () {
  
  const {address} = useContext(LayoutContext)
  
  return (
    <motion.div className={styles.container}
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'

      style={{ position: address==='/' ? 'absolute' : 'relative' }}
      >

      <div className={styles.fixed}>
        <BurgerButton/>
      </div>

    </motion.div> 
  )
}
