import styles from './Styles/FieldsContainer.module.css'
import Type from './Components/Type';
import Level from './Components/Level';
import SubType from './Components/SubType';
import Atk from './Components/Atk';
import Def from './Components/Def';
import Name from './Components/Name';
import Desc from './Components/Desc';
import SearchTools from '../../Hooks/SearchTools';
import { useCallback } from 'react';
import MainSearchField from './Components/MainSearchField';
import MoreOptionsButton from './Components/MoreOptionsButton';

function SearchFields (){
  
  const {search} = SearchTools();
  const searcher = useCallback(search,[search]);

  return (
    <div className={styles.container}>
      <MainSearchField searcher={searcher}/>
      <MoreOptionsButton/>
    </div>
  )

  // return (
  //   <div className={styles.container}>
  //     <div className={styles.section}>
  //       <Name searcher={searcher}/>
  //       <Desc searcher={searcher}/>
  //       <Type searcher={searcher}/>
  //       <SubType searcher={searcher}/>
  //     </div>
  //     <div className={styles.section}>
  //       <Level searcher={searcher}/>
  //       <Atk searcher={searcher}/>
  //       <Def searcher={searcher}/>
  //     </div>
  //   </div>  
  // )
}

export default SearchFields
