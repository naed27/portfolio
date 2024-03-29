import { Country } from "../Types/types";

export const sameCountryArraySignature = (array1: Country[], array2: Country[]) => {
  if(array1.length === 0 || array2.length === 0) return true

  const lowestLength = ((array1.length<array2.length) ? array1.length : array2.length)-1;

  const hasSameFirstElement = array1[0].area == array2[0].area;
  const hasSameLastElement = array1[lowestLength].area == array2[lowestLength].area;

  return hasSameFirstElement && hasSameLastElement;
}
 
export const stringifyQuantity = (quantity: number) => {
  if(isNaN(quantity)) return ''

  let result = ''
  let counter = 0;
  const stringed = `${quantity}`

  for (let i = stringed.length-1; i >= 0; i--) {
    if(counter!==3){
      result += stringed[i]
    }else{
      result+=`,${stringed[i]}`
      counter = 0;
    }
    counter++;
  }

  return result.split('').reverse(). join('');
}

export const sortByPopulation = (countries: Country[]) => {
  return countries.sort(({population:p1},{population:p2})=>p2-p1)
}

export const sortByName = (countries: Country[]) => {
  return countries.sort(({name:{common:n1}},{name:{common:n2}})=>sortStrings(n1,n2))
}

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
  if(input === undefined) return false
  if(isNaN(input)) return false
  return input<0;
}

export const isPositive = (input:number|undefined)=>{
  if(input === undefined) return false
  if(isNaN(input)) return false
  return input>=0;
}

export const isGreaterAndEqual = (input:number|undefined,limit:number)=>{
  if(input === undefined) return false
  if(isNaN(input)) return false
  return input>=limit;
}

export const isLesserAndEqual = (input:number|undefined,limit:number)=>{
  if(input === undefined) return false
  if(isNaN(input)) return false
  return input<=limit;
}

export const isWithinRange = (input:number|undefined,range:{min:number,max:number})=>{
  if(input===undefined) return false;
  if(input>=range.min && input<=range.max) return true;
  return false;
}

export const capitalizeFirstLetter = (str:string) => str.charAt(0).toUpperCase() + str.slice(1)

export const capitalizeProperly = (str:string|number|undefined) =>{
  if(str === null) return 'null'
  if(str === undefined) return 'undefined'
  const string  = str.toString().toLowerCase();
  const initials = string.split('.').slice(0,-1)
  if(initials.length>1){
    const allAreInitials = initials.every(initial=>initial.length === 1);
    if(allAreInitials) return initials.join('').toUpperCase();
  }
  
  return string.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

export const renewTimer = (callback:()=>void,timerId:NodeJS.Timeout, newTime:number)=>{
  clearTimeout(timerId);
  return setTimeout(callback,newTime);
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

export const hasSameLetters = (word1:string|undefined,word2:string|undefined) => {
  if(word1===undefined || word2===undefined)return false;
  if(word1.toLowerCase()===word2.toLowerCase())return true
  return false;
}

export const calcHeight = (element: HTMLElement) => {
  const elementHeight = element.offsetHeight || element.clientHeight || 0
  const elementCSS = window.getComputedStyle(element)
  const elementMargins = parseFloat(elementCSS.marginTop || '0') + parseFloat(elementCSS.marginBottom || '0')
  const elementTotalHeight = elementHeight + elementMargins
  return elementTotalHeight
}

export const calcHeightOffset = (element: HTMLElement) =>{
  const elementCSS = window.getComputedStyle(element)

  return (
    parseFloat(elementCSS.borderTop || '0') +
    parseFloat(elementCSS.borderBottom || '0')+
    parseFloat(elementCSS.paddingTop || '0') +
    parseFloat(elementCSS.paddingBottom || '0')
  )
}

export const calcWidthOffset = (element: HTMLElement) =>{
  const elementCSS = window.getComputedStyle(element)

  return (
    parseFloat(elementCSS.borderRight || '0') +
    parseFloat(elementCSS.borderLeft || '0')+
    parseFloat(elementCSS.paddingRight || '0') +
    parseFloat(elementCSS.paddingLeft || '0')
  )
}

export const getTopPadding = (element: HTMLElement) =>
  parseFloat(window.getComputedStyle(element).paddingTop || '0')

  
export const getBottomPadding = (element: HTMLElement) =>
  parseFloat(window.getComputedStyle(element).paddingBottom || '0')