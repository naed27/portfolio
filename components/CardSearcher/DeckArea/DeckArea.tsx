
import styles from './DeckArea.module.css'
import ControlPanel from './Components/ControlPanel';
import { motion } from 'framer-motion';
import animation from './Animation'
import MainDeck from './Components/MainDeck';
import SideDeck from './Components/SideDeck';
import ExtraDeck from './Components/ExtraSide';
import DeckStore from '../Hooks/DeckStore';

function DeckArea() {  

  const {
    getCard,
    getSetter,
    getDeck,
    getExistingCardCount} = DeckStore();

  const functions = {
    getCard,
    getSetter,
    getDeck,
    getExistingCardCount
  };

  return (
    <motion.div className={styles.container}
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
    >
      <ControlPanel/>
      <MainDeck functions={functions}/>
      <ExtraDeck functions={functions}/>
      <SideDeck functions={functions}/>
    </motion.div>
  )

}

export default DeckArea
