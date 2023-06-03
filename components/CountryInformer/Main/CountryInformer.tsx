import Animation from '../../Animation/Animation'
import SearchArea from '../SearchArea/SearchArea'
import { GlobalContext } from '../Context/context'
import styles from './CountryInformer.module.scss'
import ViewCardArea from '../ViewerArea/ViewerArea'
import Metadata from '../../Layout/Metadata/Metadata'
import { AnimatePresence, motion } from 'framer-motion'
import CountryInformerLogic from './CountryInformerLogic'
import NoNetwork from '../../No Network Page/NoNetwork'
import LoadingPage from '../../Loading Page/LoadingPage'
import AdvancedFilter from '../SearchArea/Components/Filter/Components/AdvancedFilter/AdvancedFilter'
import {v4 as uuidv4} from 'uuid'

export default function CountryInformer () {

  const { isLoading, globalValues, noNetwork }  = CountryInformerLogic()
  const { selectedCountry, showMoreFilters } = globalValues

  if(noNetwork) return <NoNetwork key={`${uuidv4()}`}/>

  return (
    <AnimatePresence mode={'wait'} key={`country-informer-transition`}>
      {
        isLoading ? <LoadingPage/> : 
        <motion.div className={styles.container} 
        key={`/country_informer`}
        variants={Animation}
        initial='initial'
        animate='final'
        exit='exit'
      >

        <Metadata
          key={'/projects/country-informer'}
          pageTitle={'Country Informer'}
          description={'Discover information on any nation in seconds!'}
          previewImage={'https://cdn.discordapp.com/attachments/1112753458165063701/1113728964658221087/image.png'}
        />

        <GlobalContext.Provider value={globalValues}>
          <SearchArea/>

          <AnimatePresence mode="wait">
            {selectedCountry && <ViewCardArea country={selectedCountry} key={`view_area`}/> }
          </AnimatePresence>
          
          {showMoreFilters && <AdvancedFilter/>}
        </GlobalContext.Provider>
      </motion.div>
      }
    </AnimatePresence>
  )

}