import styles from './Styles/AdvancedFilter.module.scss'
import Type from './Components/Type';
import Level from './Components/Level';
import SubType from './Components/SubType';
import Atk from './Components/Atk';
import Def from './Components/Def';
import Name from './Components/Name';
import Desc from './Components/Desc';
import SearchTools from '../../Hooks/SearchTools';
import { useCallback, useContext } from 'react';
import Modal from '../../../../utility/Modal/Modal';
import { GlobalContext } from '../../Misc/globalContext';

export default function AdvancedFilter (){
  
  const {search} = SearchTools();
  const searcher = useCallback(search,[search]);
  const { setShowMoreFilters } = useContext(GlobalContext);
  const onClickOutside = () => setShowMoreFilters(false)

  return (
    <Modal className={styles.container} onClickOutside={onClickOutside}>
      <div className={styles.section}>
        <Name searcher={searcher}/>
        <Desc searcher={searcher}/>
        <Type searcher={searcher}/>
        <SubType searcher={searcher}/>
      </div>
      <div className={styles.section}>
        <Level searcher={searcher}/>
        <Atk searcher={searcher}/>
        <Def searcher={searcher}/>
      </div>
    </Modal>
  )
}

