import { pushIfUnique, removeBlanksFromArray } from "../../../utility/functions";
import { Country, CountryClassifications, Query } from "../Types/types";
import { containsKeyword, sortStrings } from "./functions";

export const initialQuery: Query = {
  name: '',
  region: '',
  timezone: '',
  continent: '',
  population: {min: -1, max: -1},
}


export const fetchClassifications = (countries: Country[]) : CountryClassifications=>{
  
  const regionClasses:string[] = [];
  const timezonesClasses:string[] = [];
  const continentClasses:string[] = [];

  countries.map((country)=>{
    const {region,timezones,continents} = country;

      pushIfUnique(regionClasses,region)
      continents.map((a)=>pushIfUnique(continentClasses,a))
      timezones.map((a)=>pushIfUnique(timezonesClasses,a))

    return
  });

  return {
    regionClassifications:removeBlanksFromArray(regionClasses).sort(sortStrings),
    timezoneClassifications:removeBlanksFromArray(timezonesClasses).sort(sortStrings),
    continentsClassifications:removeBlanksFromArray(continentClasses).sort(sortStrings),
  }
}