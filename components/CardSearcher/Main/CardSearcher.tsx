import MENU from '../../../lib/Menu';
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
import NoNetwork from './Components/No Network Page/NoNetwork';
import LoadingPage from './Components/Loading Page/LoadingPage';
import AdvancedFilter from '../SearchArea/SearchFields/AdvancedFilter';

const metadata = (() => {
  const project = MENU.find((item)=>item.name === 'YGO Card Searcher')
  return {
    img: project?.imgSrc || undefined,
    key: project?.link || '/card-searcher',
    title: project?.name || 'YGO Card Searcher',
    desc: project?.name || 'A tool for looking up Yu-Gi-Oh cards!',
  }
})()

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
        key={metadata.key}
        pageTitle={metadata.title}
        description={metadata.desc}
        previewImage={metadata.img}
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
