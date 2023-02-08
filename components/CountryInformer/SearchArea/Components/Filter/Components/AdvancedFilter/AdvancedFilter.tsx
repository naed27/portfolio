import { useCallback, useContext } from 'react';
import Modal from '../../../../../../../utility/Modal/Modal';
import { GlobalContext } from '../../../../../Context/context';
import useSearcher from '../../../../Hooks/useSearcher';
import Name from './Components/Name';
import styles from './AdvancedFilter.module.scss'
import Region from './Components/Region';
import Continent from './Components/Continent';
import Timezone from './Components/Timezone';
import Population from './Components/Population';
import Reset from './Components/Reset';


export default function AdvancedFilter (){
  
  const {search} = useSearcher();
  const searcher = useCallback(search,[search]);
  const { setShowMoreFilters } = useContext(GlobalContext);
  const onClickOutside = () => setShowMoreFilters(false)

  return (
    <Modal className={styles.container} onClickOutside={onClickOutside}>
        <Name searcher={searcher}/>
        <Region searcher={searcher}/>
        <Timezone searcher={searcher}/>
        <Continent searcher={searcher}/>
        <Population searcher={searcher}/>
        <Reset searcher={searcher}/>
    </Modal>
  )
}

