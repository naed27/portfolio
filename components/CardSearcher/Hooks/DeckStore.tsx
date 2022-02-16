import { useCallback, useContext, useMemo } from 'react'
import { GlobalContext } from '../Misc/globalContext';
import { getCardCategory, parseLimit } from '../Misc/globalFunctions';
import { YGOCard } from '../Misc/globalTypes';

const DeckStore = () =>{

  const {
    mainDeck,setMainDeck,
    extraDeck,setExtraDeck,
    sideDeck, setSideDeck,
    query
  } = useContext(GlobalContext);

  const getCard = (category:string,index:number)=>{
    switch(category){
      case 'main':return mainDeck[index];
      case 'extra':return extraDeck[index];
      case 'side': return sideDeck[index];
      default:return null
    }
  }

  const getSetter = useCallback((category:string)=> {
    switch(category){
      case 'main':return setMainDeck;
      case 'extra':return setExtraDeck;
      case 'side':return setSideDeck;
      default:return setMainDeck;
    }
  },[ setMainDeck, setExtraDeck, setSideDeck ]);

  const getDeck = useCallback((category:string)=>{
    switch(category){
      case 'main':return mainDeck;
      case 'extra':return extraDeck;
      case 'side':return sideDeck;
      default:return mainDeck
    }
  },[ mainDeck, extraDeck, sideDeck ]);

  const getExistingCardCount = useCallback((card:YGOCard)=>{
    const wholeDeck = [...mainDeck,...extraDeck,...sideDeck];
    return wholeDeck.filter(c=>c?c.id===card.id:false).length;
  },[ mainDeck, extraDeck, sideDeck ]);

  const getDeckCardCount = useCallback((card:YGOCard,deckType:string)=>{
    const category = deckType==='main'?getCardCategory(card):'side';
    const deck = getDeck(category);
    if(!deck) return 0;
    return deck.filter(c=>c?c.id===card.id:false).length;
  },[ getDeck ]);

  const getFreeSlotsInDeck = useCallback((deck:(YGOCard | null)[])=>{
    return deck.filter((slot)=>slot===null).length;
  },[])

  const getDeckStatus = useCallback((deckType:string)=>{
    const deck = getDeck(deckType);
    const numOfCards = deck.filter((slot)=>slot!==null).length;
    const deckSize = deck.length;
    return `${numOfCards}/${deckSize}`;
  },[ getDeck ])

  const addToDeck = useCallback((deckType:string,card:YGOCard)=>{
    const deck = getDeck(deckType);
    const setter= getSetter(deckType);
    const cardLimit = parseLimit(query.cardGame, card.banlist_info);
    const cardCount = getExistingCardCount(card);
    const freeSlotsInDeck = getFreeSlotsInDeck(deck);
    const targetIndex = (deck.length-freeSlotsInDeck);

    if(freeSlotsInDeck===0)return
    if(cardCount>=cardLimit)return

    setter( current => ([
      ...current.slice(0,targetIndex),
      card,
      ...current.slice(targetIndex+1,current.length)
    ]));
  },[ getDeck, getSetter, getExistingCardCount, getFreeSlotsInDeck, query.cardGame ]);

  const removeFromDeck = useCallback((deckType:string,card:YGOCard)=>{
    const deck = getDeck(deckType);
    const setter= getSetter(deckType);
    
    const toBeRemovedIndex = deck.findIndex((slot)=>slot?slot.id===card.id:false);
    if(toBeRemovedIndex<0)return
    setter((current)=>([
      ...current.slice(0,toBeRemovedIndex),
      ...current.slice(toBeRemovedIndex+1,current.length),
      null
    ]));
  },[ getDeck, getSetter ]);

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