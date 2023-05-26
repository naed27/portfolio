import { Dispatch, SetStateAction } from 'react'

export interface Country{
  name: Name,
  tld: string[],
  cca2: string,
  ccn3: string,
  cca3: string,
  independent: boolean,
  status: string,
  unMember: boolean,
  currencies: Currencies,
  idd: IDD,
  capital: string[],
  altSpellings: string[],
  region: string,
  languages: Languages,
  translations: Translations,
  latlng: LatitudLongitude,
  landlocked: boolean,
  area: number,
  demonyms: Demonyms,
  flag: string,
  maps: Maps,
  population: number,
  car: Car,
  timezones: string[],
  continents: string[],
  flags: Flags,
  coatOfArms: CoatOfArms,
  startOfWeek: string,
  capitalInfo: { latlang: string[] }
}


// ------------------ Country Properties

interface Name{
  common: string,
  official: string,
  nativeName: {
    [key:string]: {
      official: string,
      common: string,
    }
  }
}

interface Currencies{
  [key: string]: {name: string, 
  symbol: string}
}

interface IDD{ 
  root: string, 
  suffixes: string[] 
}

interface Languages{
  [key: string]: string 
}

interface Translations{
  [key: string]: string
}

type LatitudLongitude = number[]

interface Demonyms {
  [key: string]: {
    f: string,
    m: string
  }
}

interface Maps{
  googleMaps: string,
  openStreetMaps: string
}

interface Car{
  signs: string [],
  side: string,
}

interface Flags{
  png: string,
  svg: string,
}

interface CoatOfArms{
  png: string,
  svg: string
}



// ------------------ Utility


export interface Query {
  name:string,
  region: string,
  timezone: string,
  continent: string,
  population: {min: number, max: number}
}

export interface GlobalContextType{
  readonly query: Query
  readonly setQuery: Dispatch<SetStateAction<Query>>,
  readonly countries: Country[]
  readonly setCountries: Dispatch<SetStateAction<Country[]>>,
  readonly searchedCountries: Country[]
  readonly setSearchedCountries: Dispatch<SetStateAction<Country[]>>,
  readonly selectedCountry: Country | null
  readonly setSelectedCountry: Dispatch<SetStateAction<Country | null>>,
  readonly showMoreFilters: boolean
  readonly setShowMoreFilters: Dispatch<SetStateAction<boolean>>,
  readonly sortMode: SortMode,
  readonly setSortMode:  Dispatch<SetStateAction<SortMode>>,
  readonly countryClassifications: CountryClassifications,
}

export type SortMode = 'Population' | 'Name' | 'Timezone'

export interface CountryClassifications{
 
  regionClassifications:string[],
  timezoneClassifications:string[],
  continentsClassifications:string[],

}