import {YGOCard} from './globalTypes';
import styles from './Styles/CardLimit.module.css'
import Image from 'next/image'

export const isEmpty = (str: string) => {
    return !str || 0 === str.length;
}

export const sortStrings = (a:string,b:string)=>{
  if(a.toLowerCase()>b.toLowerCase()) return 1;
  if(a.toLowerCase()<b.toLowerCase()) return -1;
  return 0;
}

export const sortNumbers = (a:number,b:number)=>{
  return a-b;
} 

export const isString = (str:any)=>{
  return typeof str === 'string' || str instanceof String;
}

export const isNegative = (input:number|undefined)=>{
  return input!==undefined && input<0;
}

export const isGreaterAndEqual = (input:number|undefined,limit:number)=>{
  return input!==undefined && input>=limit;
}

export const isLesserAndEqual = (input:number|undefined,limit:number)=>{
  return input!==undefined && input<=limit;
}

export const isWithinRange = (input:number|undefined,range:{min:number,max:number})=>{
  if(input===undefined) return false;
  if(input>=range.min && input<=range.max) return true;
  return false;
}

export const capitalizeFirstLetter = (str:string) => str.charAt(0).toUpperCase() + str.slice(1)

export const capitalizeProperly = (str:string|number) =>{
  const string  = str.toString().toLowerCase();
  const initials = string.split('.').slice(0,-1)
  if(initials.length>1){
    const allAreInitials = initials.every(initial=>initial.length === 1);
    if(allAreInitials) return initials.join('.').toUpperCase();
  }
  
  return string.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

export const renewTimer = (callback:()=>void,timerId:NodeJS.Timeout, newTime:number)=>{
  clearTimeout(timerId);
  return setTimeout(callback,newTime);
}

export const renderCardLimit = (card:YGOCard|null)=>{
  if(card===null)return null
  if(card.banlist_info === null || card.banlist_info === undefined)return null
  switch(card.banlist_info.ban_tcg){
    case 'Banned':return (
      <div className={styles.container}>
        {/* <Image 
          src={'./Forbidden.svg'} 
          alt='card image'
          layout='fill'
          objectFit='contain'
        /> */}
      </div>);
    case 'Limited':return (
      <div className={styles.container}>
        {/* <Image 
          src={'./Limited.svg'} 
          alt='card image'
          layout='fill'
          objectFit='contain'
        /> */}
      </div>)
    default:return null;
  }
}

export const getCardLimit = (card:YGOCard)=>{
  if(card.banlist_info === null || card.banlist_info === undefined)return 3;
  switch(card.banlist_info.ban_tcg){
    case 'Banned':return 0
    case 'Limited':return 1
    default:return 3;
  }
}

export const getCardCategory = (card:YGOCard)=>{
  if(
    containsKeyword(card.type,'xyz')||
    containsKeyword(card.type,'fusion')||
    containsKeyword(card.type,'synchro')||
    containsKeyword(card.type,'link')
  )return 'extra';
  return 'main'
}

export const purify = (word:string)=>{
  return word.toLowerCase().replace(/\s+/g, '');
}

export const containsKeyword = (main_word:string|undefined,key_word:string) =>{
  if(main_word===undefined)return false;
  if(purify(main_word).includes(purify(key_word)))return true;
  return false;

}

export const containsKeywords = (main_word:string|undefined,key_words:string) =>{
  if(main_word===undefined)return false;
  const mainword = main_word.toLowerCase();
  const keywords = key_words.toLowerCase().split(/[\s,]+/);
  const tracker = keywords.map((keyword)=>({
    keyword:keyword,
    i:0,
    isFound:false
  }))

  for (let i = 0; i < mainword.length; i++) {
    const letter = mainword[i];
    tracker.map((t)=>{
      if(t.isFound)return
      if(letter===t.keyword[t.i])t.i++
      else t.i=0;
      if(t.i===t.keyword.length)t.isFound=true;
    })
  }

  const foundCount = tracker.filter(({isFound})=>isFound).length;
  if(foundCount===keywords.length)return true
  else return false;

}

export const containsInitials = (words:string,keyInitials:string) =>{
  const word_initials = words.toLowerCase().split(' ').map((word)=>word.charAt(0)).join('');
  const initials = keyInitials.toLowerCase();
  if(word_initials.includes(initials))return true;
  return false;
}

export const findWord = (arrayOfWords:string[],keyword:string)=>{
  let filtered = [];
  let startWiths = arrayOfWords.filter(mainWord=>mainWord.toLowerCase().startsWith(keyword.toLowerCase()));
  let keysFound = arrayOfWords.filter(mainWord=>containsKeyword(mainWord,keyword));
  let initialsFound = arrayOfWords.filter(mainWord=>containsInitials(mainWord,keyword));
  
  if(startWiths.length>1){
      filtered.push(...startWiths);
      return filtered;
  }else{
    if(keysFound.length>1){
      filtered.push(...keysFound)
      return filtered;
    }else{
      if(initialsFound.length>1){
        filtered.push(...initialsFound)
        return filtered;
      }
    }
  }
  return false;
}

export const filterDuplicates = (array:any[])=>{
  const result:any[] = [];
  array.forEach((element)=>{
    if(!result.includes(element)){
      result.push(element);
    }
  })
  return result;
}

export const areExactlySame = (word1:string|undefined,word2:string|undefined)=>{
  if(word1===undefined || word2===undefined)return false;
  if(word1===word2)return true
  return false;
}