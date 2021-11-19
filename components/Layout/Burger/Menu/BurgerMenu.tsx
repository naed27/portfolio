import styles from './BurgerMenu.module.css';
import Link from 'next/link'
import { motion,AnimatePresence } from 'framer-motion';
import { useContext } from 'react'
import { burgerContext } from '../../../../contexts/burgerContext';
import animation from './Animation';

export default function BurgerMenu () {

  const {burgerDisplay} = useContext(burgerContext);

  return (
    <>
      <AnimatePresence>
        {burgerDisplay&&
          <motion.div className={styles.container} 
          variants={animation}
          initial='initial'
          animate='final'
          exit='exit'
          >
            <Link href="/"><a className={styles.burgerItem}>Home</a></Link>
            <Link href="/moving-box"><a className={styles.burgerItem}>Moving Box</a></Link>
            <Link href="/card-searcher"><a className={styles.burgerItem}>Card Searcher</a></Link>
            <Link href="/audio-visualizer"><a className={styles.burgerItem}>Audio Visualizer</a></Link>
            <Link href="/weather-simulator"><a className={styles.burgerItem}>Weather Simulator</a></Link>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}