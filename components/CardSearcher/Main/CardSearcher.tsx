import animation from './animation';
import DeckArea from '../DeckArea/DeckArea';
import { useContext, useEffect } from 'react';
import styles from './CardSearcher.module.scss';
import NavBar from '../NavBar/Components/NavBar';
import SearchArea from '../SearchArea/SearchArea';
import CardSearcherLogic from './CardSearcherLogic';
import { GlobalContext } from '../Misc/globalContext';
import ViewCardArea from '../ViewerArea/ViewCardArea';
import { AnimatePresence, motion } from 'framer-motion';
import NoNetwork from './Components/No Network Page/NoNetwork';
import LoadingPage from './Components/Loading Page/LoadingPage';
import { LayoutContext } from '../../Layout/Context/LayoutContext';
import AdvancedFilter from '../SearchArea/SearchFields/AdvancedFilter';

const CardSearcher = () => {

  const { isLoading, globalValues, noNetwork }  = CardSearcherLogic();
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)
  const { showDeck, showSearcher, selectedCard, showMoreFilters, showDeckBuilder } = globalValues;
  
  useEffect(()=> setAbsoluteNavBar(false), [ setAbsoluteNavBar ])

  if(noNetwork) return <NoNetwork/>
  if(isLoading) return <LoadingPage/>

  return (
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
    >
      <GlobalContext.Provider value={globalValues}>
        {showDeckBuilder && <NavBar/>}
        <AnimatePresence exitBeforeEnter>
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
