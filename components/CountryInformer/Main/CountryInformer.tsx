import Animation from '../../Animation/Animation'
import styles from './CountryInformer.module.scss'
import SearchArea from '../SearchArea/SearchArea'
import { GlobalContext } from '../Context/context'
import { AnimatePresence, motion } from 'framer-motion'
import CountryInformerLogic from './CountryInformerLogic'
import NoNetwork from './Components/No Network Page/NoNetwork'
import LoadingPage from './Components/Loading Page/LoadingPage'
import AdvancedFilter from '../SearchArea/Components/Filter/Components/AdvancedFilter/AdvancedFilter'


export default function CountryInformer () {

  const { isLoading, globalValues, noNetwork }  = CountryInformerLogic()
  const { selectedCountry, showMoreFilters } = globalValues

  if(noNetwork) return <NoNetwork/>
  if(isLoading) return <LoadingPage/>

return (

  <motion.div className={styles.container} 
    variants={Animation}
    initial='initial'
    animate='final'
    exit='exit'
  >
    <GlobalContext.Provider value={globalValues}>

      <SearchArea/>
      {showMoreFilters && <AdvancedFilter/>}

    </GlobalContext.Provider>
  </motion.div>
  
)

}