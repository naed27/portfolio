import axios from "axios";
import { GlobalContextType, Query, YGOCard } from "../Misc/globalTypes";
import { useState, useEffect, useMemo, useContext } from "react";
import { initialQuery, initializeHolders } from "../Misc/initializers";
import { fetchCardTypes } from "../SearchArea/SearchFields/Functions/Functions";
import { LayoutContext } from "../../Layout/Context/LayoutContext";

export default function CardSearcherLogic() {

  
  const { setAbsoluteNavBar, setShowNavBar } = useContext(LayoutContext)

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noNetwork, setNoNetwork] = useState<boolean>(false);

  const [query,setQuery] = useState<Query>(initialQuery);
  const [mainCards,setMainCards] = useState<YGOCard[]>([]);
  const [searchedCards,setSearchedCards] = useState<YGOCard[]>([]); 

  const [pageNumber,setPageNumber] = useState<number>(1);
  const [maxPageOfTable,setMaxPageOfTable] = useState<number>(0); 
  const [tablePageRange, setTablePageRange] = useState<number>(36);
  const [numberOfCardsShownOnPage,setNumberOfCardsShownOnPage] = useState<number>(1); 

  const [selectedCard,setSelectedCard] = useState<YGOCard|null>(null);
  const [searchIndex,setSearchIndex] = useState<number|null>(null);
  const [showMoreFilters,setShowMoreFilters] = useState<boolean>(false);

  const [mainDeck,setMainDeck] = useState<(YGOCard|null)[]>(initializeHolders(60));
  const [sideDeck,setSideDeck] = useState<(YGOCard|null)[]>(initializeHolders(15));
  const [extraDeck,setExtraDeck] = useState<(YGOCard|null)[]>(initializeHolders(15));

  const [showSearcher,toggleSearcher] = useState(true);
  const [showDeck,toggleDeck] = useState(false);
  const [showImages,setShowImages] = useState(true); //enabling images (warning: might surpass free-limit)
  const [showDeckBuilder,setShowDeckBuilder] = useState(false)

  const cardTypes = useMemo(() => fetchCardTypes(mainCards),[mainCards]);

  const globalValues:GlobalContextType = {
    query,
    showDeck,
    showImages,
    mainDeck,
    sideDeck, 
    extraDeck,
    mainCards,
    cardTypes,
    pageNumber,
    searchIndex,
    selectedCard,
    showSearcher,
    searchedCards,
    maxPageOfTable,
    tablePageRange,
    showMoreFilters,
    showDeckBuilder,
    numberOfCardsShownOnPage,
    
    setQuery,
    toggleDeck,
    setMainDeck,
    setSideDeck,
    setExtraDeck,
    setMainCards,
    setPageNumber,
    setShowImages,
    toggleSearcher, 
    setSearchIndex,
    setSelectedCard,
    setSearchedCards,
    setMaxPageOfTable,
    setTablePageRange,
    setShowMoreFilters,
    setShowDeckBuilder,
    setNumberOfCardsShownOnPage,
  }

  useEffect(()=> {
    setAbsoluteNavBar(false)
    setShowNavBar(true)
  }, [ setAbsoluteNavBar, setShowNavBar ])

  useEffect(()=>{
    const fetchAllCards = async()=>{
      const result: { data: { data: YGOCard[] } } | undefined | void = await axios.get( `https://db.ygoprodeck.com/api/v7/cardinfo.php` )
      .catch(()=>console.log('fetch failed'))
      if(!result) return setNoNetwork(true)
      const cards: YGOCard[] = result.data.data;
      setMainCards(cards)
      setSearchedCards(cards);
      setIsLoading(false);
    }
    fetchAllCards();
  },[])


  return {isLoading, noNetwork, globalValues}
}