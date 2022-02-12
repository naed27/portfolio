import styles from '../Styles/Field.module.css'
import { useCallback, useContext, useMemo} from 'react';
import Menu from './Menu';
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/globalContext';


function Type ({searcher}: {searcher:Searcher}) {

  const search = useCallback(searcher,[searcher]);

  const {query,cardTypes} = useContext(GlobalContext);

  const {primaryTypes,spellTypes,monsterTypes,trapTypes} = cardTypes;

  const primaryTypeHandler = useCallback((input:string)=> search({type:input}),[search]);
  const secondaryTypeHandler =  useCallback((input:string)=> search({subtype:input}),[search]);

  const secondaryTypes = useMemo(()=>{
    switch(query.type){
      case 'Monster': return monsterTypes;
      case 'Spell': return spellTypes;
      case 'Trap': return trapTypes;
      default:return [];
    }
  },[query.type,spellTypes,monsterTypes,trapTypes]);


  return (
    <div className={styles.container} >
      <div className={styles.label}>Type</div>
      <div className={styles.wrapper}>

        <Menu 
          title={'primary_types'}
          placeholder={query.type} 
          items={primaryTypes} 
          itemHandler={primaryTypeHandler}/>

        <div className={styles.separator}></div>

        <Menu 
          title={'secondary_types'}
          placeholder={query.subtype} 
          items={secondaryTypes} 
          itemHandler={secondaryTypeHandler}/>
      </div>
    </div>  
  )
}

export default Type
