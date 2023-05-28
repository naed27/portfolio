import Animation from '../../Animation/Animation';
import DeckArea from '../DeckArea/DeckArea';
import styles from './CardSearcher.module.scss';
import NavBar from '../NavBar/Components/NavBar';
import SearchArea from '../SearchArea/SearchArea';
import CardSearcherLogic from './CardSearcherLogic';
import { GlobalContext } from '../Misc/globalContext';
import ViewCardArea from '../ViewerArea/ViewCardArea';
import { AnimatePresence, motion } from 'framer-motion';
import NoNetwork from './Components/No Network Page/NoNetwork';
import LoadingPage from './Components/Loading Page/LoadingPage';
import AdvancedFilter from '../SearchArea/SearchFields/AdvancedFilter';
import Metadata from '../../Layout/Metadata/Metadata';

const CardSearcher = () => {

  const { isLoading, globalValues, noNetwork }  = CardSearcherLogic();
  const { showDeck, showSearcher, selectedCard, showMoreFilters, showDeckBuilder } = globalValues;
  

  if(noNetwork) return <NoNetwork/>
  if(isLoading) return <LoadingPage/>

  return (
    <motion.div className={styles.container} 
      variants={Animation}
      initial='initial'
      animate='final'
      exit='exit'
    >
      <Metadata
        pageTitle='Yu-Gi-Oh! Card Searcher'
        description='A place to look up Yu-Gi-Oh cards!'
        key={'/card-searcher'}
      />

      <GlobalContext.Provider value={globalValues}>
        {showDeckBuilder && <NavBar/>}
        <AnimatePresence mode="wait">
          {(showDeckBuilder && showDeck) && <DeckArea key={`deck_area`}/>}
          {showSearcher && <SearchArea key={`search_area`}/>}
        </AnimatePresence>
        {selectedCard && <ViewCardArea card={selectedCard} key={`view_area`}/> }
        {showMoreFilters && <AdvancedFilter/>}
      </GlobalContext.Provider>
    </motion.div>
  )
}

export default CardSearcher
