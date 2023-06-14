import { cacheApiData } from "../../../utility/functions";
import { useState, useEffect, useMemo, useContext } from "react";
import { LayoutContext } from "../../Layout/Context/LayoutContext";
import { Country, GlobalContextType, Query, SortMode } from "../Types/types";
import { fetchClassifications, initialQuery } from "../Utility/initializers";


export default function CountryInformerLogic() {

  const { setAbsoluteNavBar, setShowNavBar } = useContext(LayoutContext)

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

  useEffect(()=> {
    setAbsoluteNavBar(false)
    setShowNavBar(true)
  }, [ setAbsoluteNavBar, setShowNavBar ])

  useEffect(()=>{
    const fetchAllCards = async()=>{
      const result = await cacheApiData('https://restcountries.com/v3.1/all');
      if(!result.success) return setNoNetwork(true)
      const countries: Country[] = result.data
      setSearchedCountries(countries);
      setCountries(countries)
      setIsLoading(false);
    }
    fetchAllCards();
  },[])


  return {isLoading, noNetwork, globalValues}
}