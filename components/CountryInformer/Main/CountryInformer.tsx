import Animation from '../../Animation/Animation'
import SearchArea from '../SearchArea/SearchArea'
import { GlobalContext } from '../Context/context'
import styles from './CountryInformer.module.scss'
import ViewCardArea from '../ViewerArea/ViewerArea'
import Metadata from '../../Layout/Metadata/Metadata'
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

      <Metadata
        key={'/projects/country-informer'}
        pageTitle={'Country Informer'}
        description={'Discover information on any nation in seconds!'}
        previewImage={'https://cdn.discordapp.com/attachments/1112753458165063701/1112761535689936936/image.png'}
      />

      <GlobalContext.Provider value={globalValues}>
        <SearchArea/>

        <AnimatePresence mode="wait">
          {selectedCountry && <ViewCardArea country={selectedCountry} key={`view_area`}/> }
        </AnimatePresence>
        
        {showMoreFilters && <AdvancedFilter/>}
      </GlobalContext.Provider>
    </motion.div>
    
  )

}