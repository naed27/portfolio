import { useMemo } from "react";
import styles from './InfoSheet.module.scss'
import InfoCard from "./Components/InfoCard/InfoCard";
import { Country } from "../../../Types/types";
import { stringifyQuantity } from "../../../Utility/functions";
import { capitalizeWords, objectKeyValuesToArray, sortAlphabetically } from "../../../../../utility/functions";

interface Props{
  country: Country
}

const InfoSheet = ({country}:Props) => {

  const info = useMemo(()=>{
    return {
      name:  country.name.official,
      capital: country.capital[0],
      region: country.subregion,
      timezones: sortAlphabetically(parseTimezones(country)).join(', '),
      currency: parseCurrency(country),
      languages: parseLanguage(country),
      independent: parseIndependence(country),
      demonym_male: parseDemonymsMale(country),
      demonym_female: parseDemonymsFemale(country),
      population: stringifyQuantity(country.population),
    }
  },[country])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <InfoCard title={`Name`} value={info.name}/>
        <InfoCard title={`Population`} value={info.population}/>
        <InfoCard title={`Capital`} value={info.capital}/>
        <InfoCard title={`Independent`} value={info.independent}/>
        <InfoCard title={`Region`} value={info.region}/>
        <InfoCard title={`Languages`} value={info.languages}/>
        <InfoCard title={`Currency`} value={info.currency}/>
        <InfoCard title={`Demonym`} value={info.demonym_male}/>
        <InfoCard title={`Timezones`} value={info.timezones}/>
      </div>
    </div>
  )
};

export default InfoSheet;


// country parsers

const parseLanguage = (country: Country) => objectKeyValuesToArray(country.languages).join(', ')

const parseCurrency = (country: Country) => extractCurrency(country.currencies).join(', ')

const parseDemonymsMale = (country: Country) => extractDemonyms(country.demonyms, 'm')[0]

const parseDemonymsFemale = (country: Country) => extractDemonyms(country.demonyms, 'f')[0]

const parseIndependence = (country: Country) => country.independent ? 'Yes' : 'No'

const parseTimezones = (country: Country) => country.timezones.map(str => str === 'UTC' ? 'UTC+00:00' : str);

// extrators

const extractCurrency = (currency:{[key:string]: { name: string, symbol: string }}) =>{
  const result = [];
  for (const [key, value] of Object.entries(currency)) {
    result.push(`${capitalizeWords(value.name)} (${value.symbol})`);
  }
  return result;
}

const extractDemonyms = (demonyms:{[key:string]: { f: string, m: string }}, type: 'm' | 'f') =>{
  const result = [];
  for (const [key, value] of Object.entries(demonyms)) {
    result.push(`${ type=='m' ? value.m : value.f }`);
  }
  return result;
}