import { Dispatch, SetStateAction, useContext } from 'react'
import { GlobalContext } from '../Misc/Context';
import { containsKeywords, areExactlySame, isWithinRange, containsKeyword, isEmpty, isNegative, isGreaterAndEqual, isLessAndEqual } from '../Misc/Functions';
import { YGOCard, Query } from '../Misc/Types';

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
  type?:string,
  subtype?:string,
  race?:string,
  attribute?:string,
  atk?:{min:number,max:number},
  def?:{min:number,max:number},
  level?:{min:number,max:number},
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
    const input = {...old_input,...new_input};    // overwrite old with new
    const {type:previousType} = old_input;        // get previous type
    const {type:updatedType} = input;             // get updated type 

    if(updatedType!==previousType){               // reset sub-types if main type changes
      
      const defaultRange = { min:-1,max:-1 };
      const defaultString = '';

      input.race = defaultString
      input.subtype = defaultString
      input.attribute = defaultString
      
      input.atk = { ...defaultRange }
      input.def = { ...defaultRange }
      input.level = { ...defaultRange }

    }

    let result:YGOCard[] = [...mainCards]; // begin searching and filtering

    const {name,desc,type} = input;
    
    !isEmpty( name ) && (result = result.filter(( card )=>containsKeyword( card.name, input.name )));
    !isEmpty( desc ) && (result = result.filter(( card )=>containsKeywords( card.desc, input.desc )));
    !isEmpty( type ) && (result = result.filter(( card )=>containsKeyword( card.type, input.type )));

    if(input.type==='Monster'){

      const {level,atk,def} = input;

      !isNegative( level.min ) && (result = result.filter(( card )=>isGreaterAndEqual( card.level, level.min )));
      !isNegative( level.max ) && (result = result.filter(( card )=>isLessAndEqual( card.level, level.max )));

      !isNegative( atk.min ) && (result = result.filter(( card )=>isGreaterAndEqual( card.atk, atk.min ) ));
      !isNegative( atk.max ) && (result = result.filter(( card )=>isLessAndEqual( card.atk, atk.max )));

      !isNegative( def.min ) && (result = result.filter(( card )=>isGreaterAndEqual( card.def, def.min ) ));
      !isNegative( def.max ) && (result = result.filter(( card )=>isLessAndEqual( card.def, def.max )));

      const {race:race,subtype:stype,attribute:attr} = input

      !isEmpty( race ) && (result = result.filter(( card )=>areExactlySame( card.race, input.race )))
      !isEmpty( stype ) && (result = result.filter(( card )=>containsKeyword( card.type, input.subtype )))
      !isEmpty( attr ) && (result = result.filter(( card )=>areExactlySame( card.attribute, input.attribute )))

    }else if(input.type==='Spell'||input.type==='Trap'){

      const {subtype:stype} = input

      !isEmpty( stype ) && (result = result.filter(( card )=>containsKeyword( card.race, input.subtype )));

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