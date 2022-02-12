import animation from './animation';
import DeckArea from '../DeckArea/DeckArea';
import styles from './CardSearcher.module.css';
import { GlobalContext } from '../Misc/globalContext';
import NavBar from '../NavBar/Components/NavBar';
import SearchArea from '../SearchArea/SearchArea';
import CardSearcherLogic from './CardSearcherLogic';
import ViewCardArea from '../ViewerArea/ViewCardArea';
import { AnimatePresence, motion } from 'framer-motion';

const CardSearcher = () => {

  const { isLoading, globalValues }  = CardSearcherLogic();
  const { showDeck, showSearcher, selectedCard } = globalValues;

  if(isLoading) return <div className={styles.loaderContainer}>Loading...</div>

  return (
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
    >
      <GlobalContext.Provider value={globalValues}>
        <NavBar/>
        <AnimatePresence exitBeforeEnter>
          {showDeck&&<DeckArea key={`deck_area`}/>}
          {showSearcher&&<SearchArea key={`search_area`}/>}
        </AnimatePresence>
        {selectedCard&&<ViewCardArea card={selectedCard} key={`view_area`}/> }
      </GlobalContext.Provider>
    </motion.div>
  )
}

export default CardSearcher
