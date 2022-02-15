import styles from '../Styles/Field.module.scss'
import { useCallback, useContext, useMemo} from 'react';
import Menu from './Menu';
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/globalContext';
import FieldCover from '../../../../../utility/FieldCover/FieldCover';


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
        <FieldCover className={styles.fieldWrapper} showCover={false}>
          <Menu 
            className={styles.button} 
            title={'primary_types'}
            placeholder={query.type} 
            items={primaryTypes} 
            itemHandler={primaryTypeHandler}/>
        </FieldCover>

        <div className={styles.separator}></div>
        <FieldCover className={styles.fieldWrapper} showCover={query.type===''}>
          <Menu 
            className={styles.button}
            title={'secondary_types'}
            placeholder={query.subtype} 
            items={secondaryTypes} 
            itemHandler={secondaryTypeHandler}/>
        </FieldCover>
      </div>
    </div>  
  )
}

export default Type
