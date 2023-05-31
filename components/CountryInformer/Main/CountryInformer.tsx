import MENU from '../../../lib/Menu'
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

const metadata = (() => {
  const project = MENU.find((item)=>item.name === 'Country Informer')
  return {
    img: project?.imgSrc || undefined,
    key: project?.link || '/country-informer',
    title: project?.name || 'Country Infomer',
    desc: project?.name || 'Learn basic information of different countries.',
  }
})()

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
        key={metadata.key}
        pageTitle={metadata.title}
        description={metadata.desc}
        previewImage={metadata.img}
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