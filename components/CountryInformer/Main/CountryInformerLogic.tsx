import axios from "axios";
import { useState, useEffect, useMemo, useContext } from "react";
import { LayoutContext } from "../../Layout/Context/LayoutContext";
import { Country, GlobalContextType, Query, SortMode } from "../Types/types";
import { fetchClassifications, initialQuery } from "../Utility/initializers";


export default function CountryInformerLogic() {

  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [noNetwork, setNoNetwork] = useState<boolean>(false)

  const [query,setQuery] = useState<Query>(initialQuery)
  const [countries,setCountries] = useState<Country[]>([])
  const [searchedCountries,setSearchedCountries] = useState<Country[]>([])

  const [selectedCountry,setSelectedCountry] = useState<Country|null>(null);
  const [showMoreFilters,setShowMoreFilters] = useState<boolean>(false);
  const [sortMode,setSortMode] = useState<SortMode>('Population');

  const countryClassifications = useMemo(() => fetchClassifications(countries),[countries]);

  const globalValues:GlobalContextType = {
    query,setQuery,
    countries,setCountries,
    searchedCountries,setSearchedCountries,

    selectedCountry,setSelectedCountry,
    showMoreFilters,setShowMoreFilters,
    sortMode, setSortMode,
    countryClassifications,
  }

  useEffect(()=> setAbsoluteNavBar(false), [ setAbsoluteNavBar ])

  useEffect(()=>{
    const fetchAllCards = async()=>{
      const result: { data: Country[] } | undefined | void = await axios.get( `https://restcountries.com/v3.1/all` )
      .catch(()=>console.log('Fetch failed.'))
      if(!result) return setNoNetwork(true)
      const countries: Country[] = result.data
      setSearchedCountries(countries);
      setCountries(countries)
      setIsLoading(false);
      console.log(countries)
    }
    fetchAllCards();
  },[])


  return {isLoading, noNetwork, globalValues}
}