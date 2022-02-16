import styles from '../Styles/CardHolder.module.css'
import { YGOCard, DeckFunctions } from '../../Misc/globalTypes';
import Image from 'next/image'
import React, { useContext } from 'react';
import { containsKeyword, getCardCategory } from '../../Misc/globalFunctions';
import {parseLimit} from '../../Misc/globalFunctions';
import { GlobalContext } from '../../Misc/globalContext';
import CardImage from '../../Utility/CardImage/CardImage';

const CardHolder = ({category,index,size,functions}:{
  category:string,
  index:number,
  size:{width:number,height:number},
  functions:DeckFunctions}) => {

  const {
    getCard,
    getSetter,
    getDeck,
    getExistingCardCount
  } = functions;

  const {setSelectedCard,query} = useContext(GlobalContext); 

  const viewCard = ()=>{
    const holder = getCard(category,index);
    if(holder===null)return
    setSelectedCard(holder);
  }

  const drop = (e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault();
    const card:YGOCard = JSON.parse(e.dataTransfer.getData('card'));

    if(category==='extra'){
      if(!containsKeyword(card.type, 'monster'))return
      if(getCardCategory(card) === 'main')return
    }

    if(category==='main'){
      if(getCardCategory(card) === 'extra')return
    }

    const deck = getDeck(category);
    const setter= getSetter(category);
    const holder = getCard(category,index);
    const cardLimit = parseLimit(query.cardGame,card.banlist_info);
    const existCount = getExistingCardCount(card)
    if(deck===null||setter===null||cardLimit===existCount)return

    const availableSlots = deck.filter((slot)=>slot===null);
    if(availableSlots.length<=0)return
    const targetIndex = (deck.length-availableSlots.length);

    if(holder===null){
      return setter((current)=>([
        ...current.slice(0,targetIndex),
        card,
        ...current.slice(targetIndex+1,current.length)
      ]));
    }

    return setter((current)=>([
      ...current.slice(0,index),
      card,
      ...current.slice(index,current.length-1)
    ]));
  } 
  
  const dragEnd = (e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault();
  };
  
  const dragOver = (e:React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault();
  }

  const dragStart = async (e:React.DragEvent<HTMLDivElement>)=>{
    const holder = getCard(category,index);
    if(holder===null)return

    // transfer dragged card data
    e.dataTransfer.setData('card',JSON.stringify(holder))

    // after some time, remove the dragged card from the deck
    setTimeout(() => {
      const setter= getSetter(category);
      if(setter===null)return
      return setter((current)=>{
        const filtered = [
          ...current.slice(0,index),
          ...current.slice(index+1,current.length),
          null
        ]
        return filtered
      });
    }, 0.1);
  };

  const render = (card: YGOCard | null)=>{
    if(card===null)return
    const limit = parseLimit(query.cardGame,card.banlist_info)
    return <CardImage card={card} limit={limit}/>
  }

  return (
    <div 
      className={styles.card} 
      style={{width:size.width,height:size.height}}
      onDrop={drop} 
      onDragOver={dragOver}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onClick={viewCard}
    >
      {render(getCard(category,index))}
    </div>
  );

}

export default CardHolder
