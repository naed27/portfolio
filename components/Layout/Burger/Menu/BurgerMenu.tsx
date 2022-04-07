import styles from './BurgerMenu.module.scss';
import Link from 'next/link'
import { motion,AnimatePresence } from 'framer-motion';
import { useContext, useCallback } from 'react'
import { LayoutContext } from '../../Context/LayoutContext'
import animation from './Animation';

export default function BurgerMenu () {

  return (
    <AnimatePresence>
      <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
      >
        
        <BurgerLink
          label = 'Home'
          href = '/'
          hasNav = {false}
        />
        
        <BurgerLink
          label = 'Card Searcher'
          href = '/projects/card-searcher'
        />

        <BurgerLink
          label = 'Audio Visualizer'
          href = '/projects/audio-visualizer'
        />

      </motion.div>
    </AnimatePresence>
  )
}

function BurgerLink ({label, href, hasNav = true}:{label: string,href: string, hasNav?: boolean}) {
  
  const {setAddress, setShowHeader} = useContext(LayoutContext);

  const process = useCallback((href: string) => {
    setAddress(href)
    setShowHeader(hasNav)
  },[hasNav, setAddress, setShowHeader])

  return (
    <Link href={href}>
      <a onClick={()=>process(href)}>
        {label}
      </a>
    </Link>
  )
}