import styles from './ProjectsMenu.module.scss';
import {useContext,useEffect} from 'react'
import {LayoutContext} from '../Layout/Context/LayoutContext'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Body from '../Components/Body/Body';
import Chest from '../Components/Chest/Chest';
import { motion } from 'framer-motion'
import Animation from '../../Animation/Animation';

export default function ProjectsMenu () {
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