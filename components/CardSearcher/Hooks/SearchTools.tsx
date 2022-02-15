import { Dispatch, SetStateAction, useContext } from 'react'
import { YGOCard, Query, YGOCardGame } from '../Misc/globalTypes';
import { GlobalContext } from '../Misc/globalContext';
import { 
  isEmpty, 
  isNegative, 
  areExactlySame, 
  containsKeyword, 
  isGreaterAndEqual,
  isLesserAndEqual,
  containsKeywords,
  hasSameLetters,
  parseLimit, } from '../Misc/globalFunctions';

export interface SearchStoreType {
  query: Query,
  mainCards: YGOCard[],
  setSearchedCards: Dispatch<SetStateAction<YGOCard[]>>,
  setPageNumber: Dispatch<SetStateAction<number>>,
  search: Searcher,
}
export type Searcher = (input: InputQuery) => void;

export interface InputQuery{
  name?:string,
  desc?:string,
  keywords?:string,
  type?:string,
  subtype?:string,
  race?:string,
  attribute?:string,
  atk?:{min:number,max:number},
  def?:{min:number,max:number},
  level?:{min:number,max:number},
  limit?:number,
  cardGame?:YGOCardGame,
}

const SearchTools = () =>{

  const {
    query, 
    setQuery,
    mainCards,
    setPageNumber,
    setSearchedCards,
  } = useContext(GlobalContext);

  const search = (new_input:InputQuery)=>{

    const old_input = query
    const input: Query = {...old_input,...new_input};    // overwrite old input with new input
    const {type:previousType} = old_input;               // get previous type
    const {type:updatedType} = input;                    // get updated type 

    if(updatedType!==previousType){                      // reset sub-types if main type changes
      
      const defaultRange = { min:-1,max:-1 };
      const defaultString = '';

      input.race = defaultString
      input.subtype = defaultString
      input.attribute = defaultString
      
      input.atk = { ...defaultRange }
      input.def = { ...defaultRange }
      input.level = { ...defaultRange }

    }

    let result:YGOCard[] = [...mainCards];
    
    !isNegative( input.limit ) && (result = filterByLimit ( input.limit, input.cardGame, result ))
    !isEmpty( input.name ) && (result = filterByName ( input.name, result ))
    !isEmpty( input.desc ) && (result = filterByDesc ( input.desc, result ))
    !isEmpty( input.keywords ) && (result = filterByKeywords ( input.keywords, result ))
    !isEmpty( input.type ) && (result = filterByType ( input.type, result ))

    if(input.type==='Monster'){

      !isNegative( input.level.min ) && (result = filterByMinLv ( input.level.min, result ));
      !isNegative( input.level.max ) && (result = filterByMaxLv ( input.level.max, result ));

      !isNegative( input.atk.min ) && (result = filterByMinAtk ( input.atk.min, result ));
      !isNegative( input.atk.max ) && (result = filterByMaxAtk ( input.atk.max, result ));

      !isNegative( input.def.min ) && (result = filterByMinDef ( input.def.min, result ));
      !isNegative( input.def.max ) && (result = filterByMaxDef ( input.def.max, result ));

      !isEmpty( input.race ) && (result = filterByRace ( input.race, result ))
      !isEmpty( input.subtype ) && (result = filterByMonsterSubType ( input.subtype, result ))
      !isEmpty( input.attribute ) && (result = filterByAttr ( input.attribute, result ))

    }else if(input.type==='Spell'||input.type==='Trap'){

      !isEmpty( input.subtype ) && (result = filterByNonMonsterSubType ( input.subtype, result ))

    }
    
    setPageNumber( 1 );

    if( result.length === 0 )
      setPageNumber( 0 );

    setQuery( input );
    setSearchedCards( result );

    
  }

  return {search}
}

export default SearchTools;

const filterByName = (name: string, result:YGOCard[]) => result.filter( c => containsKeyword( c.name, name ))
const filterByDesc = (desc: string, result:YGOCard[]) => result.filter( c => containsKeyword( c.desc, desc ))
const filterByKeywords = (keywords: string, result:YGOCard[]) => result.filter( c => containsKeywords( c.name, keywords ) || containsKeywords( c.desc, keywords ) )
const filterByType = (type: string, result:YGOCard[]) => result.filter( c => containsKeyword( c.type, type ))
const filterByMinLv = (min: number, result:YGOCard[]) => result.filter( c => isGreaterAndEqual(c.level, min))
const filterByMaxLv = (max: number, result:YGOCard[]) => result.filter( c => isLesserAndEqual(c.level, max))
const filterByMinAtk = (min: number, result:YGOCard[]) => result.filter( c => isGreaterAndEqual(c.atk, min))
const filterByMaxAtk = (max: number, result:YGOCard[]) => result.filter( c => isLesserAndEqual(c.atk, max))
const filterByMinDef = (min: number, result:YGOCard[]) => result.filter( c => isGreaterAndEqual(c.def, min))
const filterByMaxDef = (max: number, result:YGOCard[]) => result.filter( c => isLesserAndEqual(c.def, max))
const filterByRace = (race: string, result:YGOCard[]) => result.filter( c => areExactlySame( c.race, race ))
const filterByAttr = (attr: string, result:YGOCard[]) => result.filter( c => areExactlySame( c.attribute, attr ))
const filterByMonsterSubType = (subType: string, result:YGOCard[]) => result.filter( c => hasSameLetters( c.type.split(' ')[0], subType ))
const filterByNonMonsterSubType = (subType: string, result:YGOCard[]) => result.filter( c => containsKeyword( c.race, subType))
const filterByLimit = (limit: number, cardGame:YGOCardGame, result:YGOCard[]) => result.filter( c => {
  const {banlist_info} = c;
  return limit === parseLimit(cardGame, banlist_info);
})


