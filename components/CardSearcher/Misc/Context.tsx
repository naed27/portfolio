import { createContext } from "react";
import Initializer from "./Initializer";
import { GlobalContextType } from "./Types";

const {
  initialQuery
} = Initializer();

export const GlobalContext = createContext<GlobalContextType>({
  showSearcher:true,
  toggleSearcher:()=>null,
  showDeck:false,
  toggleDeck:()=>null,

  mainCards:[],
  setMainCards:()=>null,
  searchedCards:[],
  setSearchedCards:()=>null,
  pageNumber:0,
  setPageNumber:()=>null,
  pageCardCount:0,
  setPageCardCount:()=>null,
  query:initialQuery(),
  setQuery:()=>null,

  mainDeck:[],
  setMainDeck:()=>null,
  extraDeck:[],
  setExtraDeck:()=>null,
  sideDeck:[], 
  setSideDeck:()=>null,

  selectedCard:null,
  setSelectedCard:()=>null,
  searchIndex:null,
  setSearchIndex:()=>null,

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