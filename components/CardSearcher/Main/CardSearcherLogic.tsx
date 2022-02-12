import axios from "axios";
import { Query, YGOCard } from "../Misc/globalTypes";
import { useState, useEffect, useMemo } from "react";
import { initialQuery, initializeHolders } from "../Misc/initializers";
import { fetchUniqueProps } from "../SearchArea/SearchFields/Functions/Functions";

export default function CardSearcherLogic() {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [query,setQuery] = useState<Query>(initialQuery);
  const [mainCards,setMainCards] = useState<YGOCard[]>([]);
  const [searchedCards,setSearchedCards] = useState<YGOCard[]>([]); 

  const [pageNumber,setPageNumber] = useState<number>(1);
  const [maxPageOfTable,setMaxPageOfTable] = useState<number>(0); 
  const [tablePageRange, setTablePageRange] = useState<number>(20);
  const [numberOfCardsShownOnPage,setNumberOfCardsShownOnPage] = useState<number>(1); 

  const [selectedCard,setSelectedCard] = useState<YGOCard|null>(null);
  const [searchIndex,setSearchIndex] = useState<number|null>(null);

  const [mainDeck,setMainDeck] = useState<(YGOCard|null)[]>(initializeHolders(60));
  const [sideDeck,setSideDeck] = useState<(YGOCard|null)[]>(initializeHolders(15));
  const [extraDeck,setExtraDeck] = useState<(YGOCard|null)[]>(initializeHolders(15));

  const [showSearcher,toggleSearcher] = useState(true);
  const [showDeck,toggleDeck] = useState(false);

  const cardTypes = useMemo(() => fetchUniqueProps(mainCards),[mainCards]);

  const globalValues = {
    query,
    showDeck,
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
    numberOfCardsShownOnPage,

    setQuery,
    toggleDeck,
    setMainDeck,
    setSideDeck,
    setExtraDeck,
    setMainCards,
    setPageNumber,
    toggleSearcher, 
    setSearchIndex,
    setSelectedCard,
    setSearchedCards,
    setMaxPageOfTable,
    setTablePageRange,
    setNumberOfCardsShownOnPage,
  }

  useEffect(()=>{
    const fetchAllCards = async()=>{
      const result: { data: { data: YGOCard[] } } = await axios.get( `https://db.ygoprodeck.com/api/v7/cardinfo.php` );
      const cards: YGOCard[] = result.data.data;
      setMainCards(cards)
      setSearchedCards(cards);
      setIsLoading(false);
    }
    fetchAllCards();
  },[])

  return {isLoading, globalValues}
}