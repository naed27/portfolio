import DeckArea from '../DeckArea/DeckArea';
import styles from './CardSearcher.module.scss';
import NavBar from '../NavBar/Components/NavBar';
import SearchArea from '../SearchArea/SearchArea';
import Animation from '../../Animation/Animation';
import CardSearcherLogic from './CardSearcherLogic';
import { GlobalContext } from '../Misc/globalContext';
import ViewCardArea from '../ViewerArea/ViewCardArea';
import Metadata from '../../Layout/Metadata/Metadata';
import { AnimatePresence, motion } from 'framer-motion';
import NoNetwork from '../../No Network Page/NoNetwork';
import LoadingPage from '../../Loading Page/LoadingPage';
import AdvancedFilter from '../SearchArea/SearchFields/AdvancedFilter';

const CardSearcher = () => {

  const { isLoading, globalValues, noNetwork }  = CardSearcherLogic();
  const { showDeck, showSearcher, selectedCard, showMoreFilters, showDeckBuilder } = globalValues;

  if(noNetwork) return <NoNetwork/>

  return (
    <AnimatePresence mode={'wait'} key={`card-searcher-transition`}>
      {isLoading ? <LoadingPage/>:
        <motion.div className={styles.container} 
        key={`/card_searcher`}
        variants={Animation}
        initial='initial'
        animate='final'
        exit='exit'
        >
        <Metadata
          key={'/projects/card-searcher'}
          pageTitle={'YGO Card Searcher'}
          description={'Access stats, effects, and more for every card in the game!'}
          previewImage={'https://cdn.discordapp.com/attachments/1112753458165063701/1112753476980719678/image.png'}
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
      }
    </AnimatePresence>
  )
}

export default CardSearcher
