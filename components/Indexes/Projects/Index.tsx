import styles from './Index.module.scss';
import {useContext,useEffect} from 'react'
import {LayoutContext} from '../../Layout/Context/LayoutContext'
import Header from '../../Home/Components/Header/Header';
import Footer from '../../Home/Components/Footer/Footer';
import Body from '../../Home/Components/Body/Body';
import Chest from '../../Home/Components/Chest/Chest';
import { motion } from 'framer-motion'
import Animation from '../../Animation/Animation';

export default function Index () {
  const { setAbsoluteNavBar }  = useContext(LayoutContext)

  useEffect(()=>setAbsoluteNavBar(true), [setAbsoluteNavBar])

  return (
    <motion.div className={styles.container}
      variants={Animation}
      initial='initial'
      animate='final'
      exit='exit'>
      <Header label='Projects'/>
      <Body>
        <Chest label='Yu-Gi-Oh Card Searcher' href='/projects/card-searcher' />
        <Chest label='Audio Visualizer' href='/projects/audio-visualizer' />
      </Body>
      <Footer/>
    </motion.div>
  )
}