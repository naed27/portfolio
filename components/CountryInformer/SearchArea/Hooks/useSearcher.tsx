import { Dispatch, SetStateAction, useContext } from "react";
import { containsKeyword } from "../../../CardSearcher/Misc/globalFunctions";
import { GlobalContext } from "../../Context/context";
import { Country, Query } from "../../Types/types";
import { areExactlySame, isEmpty, isGreaterAndEqual, isLesserAndEqual, isNegative, isPositive } from "../../Utility/functions";


export interface SearchStoreType {
  query: Query,
  countries: Country[],
  setSearchedCards: Dispatch<SetStateAction<Country[]>>,
  setPageNumber: Dispatch<SetStateAction<number>>,
  search: Searcher,
}

export type Searcher = (input: InputQuery) => void;

export interface InputQuery{
  name?:string,
  region?:string,
  timezone?:string,
  continent?:string,
  population?: {min: number, max: number},
}

export default function useSearcher () {

  const {
    query, 
    setQuery,
    countries,
    setSearchedCountries,
  } = useContext(GlobalContext);

  const search = (new_input:InputQuery)=>{

    const old_input = query
    const input: Query = {...old_input,...new_input};    // overwrite old input with new input
    
    let result: Country[] = [...countries];
    
    !isEmpty( input.name ) && (result = filterByName ( input.name, result ))
    !isEmpty( input.region ) && (result = filterByRegion ( input.region, result ))
    !isEmpty( input.timezone ) && (result = filterByTimezone ( input.timezone, result ))
    !isEmpty( input.continent ) && (result = filterByContinent ( input.continent, result ))

    isPositive( input.population.min ) && (result = filterByMinPop ( input.population.min, result ));
    isPositive( input.population.max ) && (result = filterByMaxPop ( input.population.max, result ));

    setQuery( input );
    setSearchedCountries( result );

  }

  return {search}
}

const filterByName = (name: string, result:Country[]) => result.filter( c => containsKeyword( c.name.common, name ))
const filterByMinPop = (min: number, result:Country[]) => result.filter( c => isGreaterAndEqual(c.population, min))
const filterByMaxPop = (max: number, result:Country[]) => result.filter( c => isLesserAndEqual(c.population, max))
const filterByRegion = (region: string, result:Country[]) => result.filter( c => areExactlySame( c.region, region ))
const filterByContinent = (continent: string, result:Country[]) => result.filter( c => c.continents.includes(continent))
const filterByTimezone = (timezone: string, result:Country[]) => result.filter( c => c.timezones.includes(timezone))



