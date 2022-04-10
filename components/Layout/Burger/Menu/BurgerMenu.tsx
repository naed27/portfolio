import styles from './BurgerMenu.module.scss';
import Link from 'next/link'
import { motion,AnimatePresence } from 'framer-motion';
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

function BurgerLink ({label, href}:{label: string,href: string}) {
  
  return (
    <Link href={href}>
      <a> {label} </a>
    </Link>
  )
}