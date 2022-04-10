import Body from './Components/Body/Body'
import Header from './Components/Header/Header'
import styles from './Home.module.scss'
import { motion } from 'framer-motion'
import animation from './Animation'
import Footer from './Components/Footer/Footer'
import { useContext, useEffect } from 'react'
import { LayoutContext } from '../Layout/Context/LayoutContext'

export default function Home () {
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  useEffect(()=> setAbsoluteNavBar(true), [ setAbsoluteNavBar ])

  return (
    <motion.div className={styles.container}
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'>

      <Header/>
      <Body/>
      <Footer/>
      
    </motion.div>
  )
}