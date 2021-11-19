import { useContext } from 'react'
import { GlobalContext } from '../Misc/Context';
import { getCardCategory, getCardLimit } from '../Misc/Functions';
import { YGOCard } from '../Misc/Types';

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
      default:return null;
    }
  }

  const getDeck = (category:string)=>{
    switch(category){
      case 'main':return mainDeck;
      case 'extra':return extraDeck;
      case 'side':return sideDeck;
      default:return null
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

  const addToDeck = (deckType:string,card:YGOCard)=>{
    const category = deckType==='main'?getCardCategory(card):'side';
    const deck = getDeck(category);
    const setter= getSetter(category);
    const cardLimit = getCardLimit(card);
    const cardCount = getExistingCardCount(card)

    if(deck===null||setter===null)return null
    
    const deckSlots = deck.filter((slot)=>slot===null).length;
    const targetIndex = (deck.length-deckSlots);

    if(deckSlots===0)return {status:-1,message:'deck full',cardCount,deckSlots}
    if(cardCount===cardLimit)return {status:-1,message:'card limit reached',cardCount,deckSlots}

    setter((current)=>([
      ...current.slice(0,targetIndex),
      card,
      ...current.slice(targetIndex+1,current.length)
    ]));

    return {status:1,message:'card added',cardCount:cardCount+1,deckSlots:deckSlots-1}
  }

  const removeFromDeck = (deckType:string,card:YGOCard)=>{
    const category = deckType==='main'?getCardCategory(card):'side';
    const deck = getDeck(category);
    const setter= getSetter(category);
    const cardCount = getExistingCardCount(card);
    if(deck===null||setter===null)return null
    
    const toBeRemovedIndex = deck.findIndex((slot)=>slot?slot.id===card.id:false);
    if(toBeRemovedIndex<0)return {status:-1,message:'card not found in deck',cardCount}
    setter((current)=>([
      ...current.slice(0,toBeRemovedIndex),
      ...current.slice(toBeRemovedIndex+1,current.length),
      null
    ]));
    return {status:1,message:'card removed',cardCount:cardCount-1}
  }

  return {
    mainDeck, setMainDeck,
    extraDeck, setExtraDeck,
    sideDeck, setSideDeck,

    getCard,
    getSetter,
    getDeck,
    getExistingCardCount,getDeckCardCount,
    addToDeck,removeFromDeck,
  }
}

export default DeckStore;