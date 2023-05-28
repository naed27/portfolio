import Body from './Components/Body/Body'
import Header from './Components/Header/Header'
import styles from './Home.module.scss'
import { motion } from 'framer-motion'
import animation from './Animation'
import Footer from './Components/Footer/Footer'
import { useContext, useEffect } from 'react'
import { LayoutContext } from '../Layout/Context/LayoutContext'
import Sphere from './Components/Sphere/Sphere'
import Head from 'next/head';
import Metadata from '../Layout/Metadata/Metadata'

export default function Home () {
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  useEffect(()=> setAbsoluteNavBar(true), [ setAbsoluteNavBar ])

  return (
    <motion.div className={styles.container}
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'>

      <Metadata
        pageTitle='Dean - Portfolio'
        description='A portfolio containing all my works as a web developer!'
      />

      <Header label='Dean'/>
      
      <Body>
        <Sphere label='P R O J E C T S' href='/projects' />
      </Body>

      <Footer/>
      
    </motion.div>
  )
}