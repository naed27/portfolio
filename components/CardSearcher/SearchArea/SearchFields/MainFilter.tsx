import styles from './Styles/MainFilter.module.scss'
import SearchTools from '../../Hooks/SearchTools';
import { useCallback } from 'react';
import MainSearchField from './Components/MainSearchField';
import MoreOptionsButton from './Components/MoreOptionsButton';

export default function MainFilter (){
  
  const {search} = SearchTools();
  const searcher = useCallback(search,[search]);

  return (
    <div className={styles.container}>
      <MainSearchField searcher={searcher}/>
    </div>
  )
}

