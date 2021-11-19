import styles from './CardSearcher.module.css'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import animation from './Animation/CardSearcher';
import { YGOCard } from './Misc/Types';
import {GlobalContext} from './Misc/Context';
import SearchArea from './SearchArea/SearchArea';
import DeckArea from './DeckArea/DeckArea';
import ViewCardArea from './ViewerArea/ViewCardArea';
import axios from 'axios';
import Initializer from './Misc/Initializer';
import NavBar from './NavBar/Components/NavBar';
import { fetchUniqueProps } from './SearchArea/SearchFields/Functions/Functions';

function CardSearcher() {

  const {
    initialQuery
  } = Initializer();

  const [mainCards,setMainCards] = useState<YGOCard[]>([]);
  const [searchedCards,setSearchedCards] = useState<YGOCard[]>([]); 
  const [pageNumber,setPageNumber] = useState(1);
  const [pageCardCount,setPageCardCount] = useState(1); 
  const [query,setQuery] = useState(initialQuery);

  const [selectedCard,setSelectedCard] = useState<YGOCard|null>(null);
  const [searchIndex,setSearchIndex] = useState<number|null>(null);

  const [mainDeck,setMainDeck] = useState<(YGOCard|null)[]>([]);
  const [sideDeck,setSideDeck] = useState<(YGOCard|null)[]>([]);
  const [extraDeck,setExtraDeck] = useState<(YGOCard|null)[]>([]);

  const [showSearcher,toggleSearcher] = useState(true);
  const [showDeck,toggleDeck] = useState(false);

  const cardTypes = useMemo(()=>fetchUniqueProps(mainCards),[mainCards]);

  const globalValues ={
    showSearcher,toggleSearcher,
    showDeck,toggleDeck,

    mainCards,setMainCards,
    searchedCards,setSearchedCards,
    pageNumber,setPageNumber,
    pageCardCount,setPageCardCount,
    query,setQuery,

    mainDeck,setMainDeck,
    extraDeck,setExtraDeck,
    sideDeck, setSideDeck,

    searchIndex,setSearchIndex,
    selectedCard,setSelectedCard,

    cardTypes
  }


  useEffect(()=>{
    const fetch = async()=>{
      const {data:{data}}:{data:{data:YGOCard[]}} = await axios.get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php`
      );
      setMainCards(data)
      setSearchedCards(data);
    }
    fetch();
  },[setMainCards,setSearchedCards])

  return (
    <motion.div className={styles.container} 
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'
    >
      {mainCards.length>0? 
      (
        <GlobalContext.Provider value={globalValues}>
         
          <NavBar/>
          <AnimatePresence>
            {showSearcher&&<SearchArea key={`search_area`}/>}
            {showDeck&&<DeckArea key={`deck_area`}/>}
            {selectedCard&&<ViewCardArea card={selectedCard} key={`view_area`}/> }
          </AnimatePresence>

        </GlobalContext.Provider>
      ):(
        <div className={styles.loaderContainer}>loading...</div>
      )}
    </motion.div>
  )

}

export default CardSearcher
