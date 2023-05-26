import animation from "./Animation";
import { motion } from 'framer-motion';
import styles from './ViewerArea.module.scss';
import type { Country } from "../Types/types";
import { GlobalContext } from "../Context/context";
import { useContext, useEffect, useRef } from "react";
import InfoCanvas from "./Components/InfoCanvas/InfoCanvas";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import CountryName from "./Components/InfoCanvas/Components/CountryName/CountryName";
import CountryImage from "./Components/InfoCanvas/Components/CountryImage/CountryImage";
import InfoSheet from "./Components/InfoSheet/InfoSheet";
import CanvasToggler from "./Components/InfoCanvas/Components/CanvasToggler/CanvasToggler";
import InfoCard from "./Components/InfoSheet/Components/InfoCard/InfoCard";
import { capitalizeWords, objectKeyValuesToArray } from "../../../utility/functions";



function ViewCardArea({country}:{country:Country}) {

  const { setSelectedCountry } = useContext(GlobalContext);

  const modalRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(modalRef, () => setSelectedCountry && setSelectedCountry(null));

  useEffect(()=>{console.log(country)},[country])

  return (
    <motion.div className={styles.backdrop}
    variants={animation}
    initial='initial'
    animate='final'
    exit='exit'
    >
      <div className={styles.container} ref={modalRef}>

        <InfoCanvas>
          <CountryName country={country}/>
          <CountryImage country={country}/>
          <CanvasToggler/>
        </InfoCanvas>

        <InfoSheet>
          <InfoCard title={`Capital`} value={`${country.capital}`}/>
          <InfoCard title={`Languages`} value={`${parseLanguage(country)}`}/>
          <InfoCard title={`Currency`} value={`${parseCurrency(country)}`}/>
          <InfoCard title={`Demonym (♂️)`} value={`${parseDemonymsMales(country)}`}/>
          <InfoCard title={`Demonym (♀️)`} value={`${parseDemonymsFemales(country)}`}/>
        </InfoSheet>

        
      </div>
    </motion.div>
  )
}

export default ViewCardArea



// country parsers

const parseLanguage = (country: Country) => objectKeyValuesToArray(country.languages).join(', ')

const parseCurrency = (country: Country) => extractCurrency(country.currencies).join(', ')

const parseDemonymsMales = (country: Country) => extractDemonyms(country.demonyms, 'm').join(', ')

const parseDemonymsFemales = (country: Country) => extractDemonyms(country.demonyms, 'f').join(', ')

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