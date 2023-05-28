import styles from './ProjectsMenu.module.scss';
import {useContext,useEffect} from 'react'
import {LayoutContext} from '../Layout/Context/LayoutContext'
import Header from '../Home/Components/Header/Header';
import Footer from '../Home/Components/Footer/Footer';
import Chest from './Components/Chest/Chest';
import { motion } from 'framer-motion'
import Animation from '../Animation/Animation';
import Metadata from '../Layout/Metadata/Metadata';

export default function ProjectsMenu () {
  const { setAbsoluteNavBar }  = useContext(LayoutContext)

  useEffect(()=>setAbsoluteNavBar(true), [setAbsoluteNavBar])

  return (
    <motion.div className={styles.container}
      key={'/projects'}
      variants={Animation}
      initial='initial'
      animate='final'
      exit='exit'>

      <Metadata
        pageTitle='Projects'
        description='Just a list of my projects.'
        key={'/country-informer'}
      />

      <Header label='Projects'/>
      
      <div className={styles.menu}>
        <Chest label='Yu-Gi-Oh Card Searcher' href='/projects/card-searcher' />
        <Chest label='Country Informer' href='/projects/country-informer' />
        <Chest label='Audio Visualizer' href='/projects/audio-visualizer' />
      </div>
        
      <Footer/>
    </motion.div>
  )
}