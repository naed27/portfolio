import { createContext } from 'react';
import { initialQuery } from './initializers';
import { GlobalContextType } from './globalTypes';

export const GlobalContext = createContext<GlobalContextType>({
  mainDeck:[],
  sideDeck:[], 
  extraDeck:[],
  mainCards:[],
  pageNumber: 0,
  showDeck: false,
  searchIndex:null,
  searchedCards:[],
  maxPageOfTable:0,
  selectedCard:null,
  showSearcher: true,
  query: initialQuery,
  numberOfCardsShownOnPage:0,
  tablePageRange:20,

  setQuery:()=>null,
  toggleDeck:()=>null,
  setMainDeck:()=>null,
  setSideDeck:()=>null,
  setExtraDeck:()=>null,
  setMainCards:()=>null,
  setPageNumber:()=>null,
  setSearchIndex:()=>null,
  toggleSearcher:()=>null,
  setSelectedCard:()=>null,
  setSearchedCards:()=>null,
  setMaxPageOfTable:()=>null,
  setNumberOfCardsShownOnPage:()=>null,
  setTablePageRange:()=>null,

  cardTypes:{
    primaryTypes:[],
    monsterTypes:[],
    spellTypes:[],
    trapTypes:[],
    attributes:[],
    races:[],
    levels:[],
  }
});