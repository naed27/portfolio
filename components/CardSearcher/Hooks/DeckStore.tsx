import { useContext } from 'react'
import { GlobalContext } from '../Misc/globalContext';
import { getCardCategory, getCardLimit } from '../Misc/globalFunctions';
import { YGOCard } from '../Misc/globalTypes';

const DeckStore = () =>{

  const {
    mainDeck,setMainDeck,
    extraDeck,setExtraDeck,
    sideDeck, setSideDeck,
  } = useContext(GlobalContext);

  const getCard = (category:string,index:number)=>{
    switch(category){
      case 'main':return mainDeck[index];
      case 'extra':return extraDeck[index];
      case 'side': return sideDeck[index];
      default:return null
    }
  }

  const getSetter = (category:string)=>{
    switch(category){
      case 'main':return setMainDeck;
      case 'extra':return setExtraDeck;
      case 'side':return setSideDeck;
      default:return setMainDeck;
    }
  }

  const getDeck = (category:string)=>{
    switch(category){
      case 'main':return mainDeck;
      case 'extra':return extraDeck;
      case 'side':return sideDeck;
      default:return mainDeck
    }
  }

  const getExistingCardCount = (card:YGOCard)=>{
    const wholeDeck = [...mainDeck,...extraDeck,...sideDeck];
    return wholeDeck.filter(c=>c?c.id===card.id:false).length;
  }

  const getDeckCardCount = (card:YGOCard,deckType:string)=>{
    const category = deckType==='main'?getCardCategory(card):'side';
    const deck = getDeck(category);
    if(!deck) return 0;
    return deck.filter(c=>c?c.id===card.id:false).length;
  }

  const getFreeSlotsInDeck = (deck:(YGOCard | null)[])=>{
    return deck.filter((slot)=>slot===null).length;
  }

  const getDeckStatus = (deckType:string)=>{
    const deck = getDeck(deckType);
    const numOfCards = deck.filter((slot)=>slot!==null).length;
    const deckSize = deck.length;
    return `${numOfCards}/${deckSize}`;
  }

  const addToDeck = (deckType:string,card:YGOCard)=>{
    const deck = getDeck(deckType);
    const setter= getSetter(deckType);
    const cardLimit = getCardLimit(card);
    const cardCount = getExistingCardCount(card);
    const freeSlotsInDeck = getFreeSlotsInDeck(deck);
    const targetIndex = (deck.length-freeSlotsInDeck);

    if(freeSlotsInDeck===0)return
    if(cardCount===cardLimit)return

    setter( current => ([
      ...current.slice(0,targetIndex),
      card,
      ...current.slice(targetIndex+1,current.length)
    ]));
  }

  const removeFromDeck = (deckType:string,card:YGOCard)=>{
    const deck = getDeck(deckType);
    const setter= getSetter(deckType);
    
    const toBeRemovedIndex = deck.findIndex((slot)=>slot?slot.id===card.id:false);
    if(toBeRemovedIndex<0)return
    setter((current)=>([
      ...current.slice(0,toBeRemovedIndex),
      ...current.slice(toBeRemovedIndex+1,current.length),
      null
    ]));
  }

  return {
    mainDeck, setMainDeck,
    extraDeck, setExtraDeck,
    sideDeck, setSideDeck,

    getCard,
    getSetter,
    getDeck,
    getExistingCardCount,getDeckCardCount,
    addToDeck,removeFromDeck,getDeckStatus
  }
}

export default DeckStore;