import styles from '../Styles/Field.module.css'
import { useCallback, useContext } from 'react';
import Menu from './Menu';
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/Context';



function SubType ({searcher}: {searcher:Searcher}){

  const search = useCallback(searcher,[searcher]);
  
  const {query,cardTypes} = useContext(GlobalContext);

  const {races,attributes} = cardTypes

  const raceChoices = query.type==='Monster'?races:[];
  const attrChoices = query.type==='Monster'?attributes:[];

  const raceHandler = (input:string)=>search({race:input});

  const attrHandler = (input:string)=>search({attribute:input});

  return (
    <div className={styles.container}>
      <div className={styles.label}></div>
      <div className={styles.wrapper}>

        <Menu
          title={'races'}
          placeholder={query.race} 
          items={raceChoices} 
          itemHandler={raceHandler}/>

        <div className={styles.separator}></div>

        <Menu
          title={'attributes'}
          placeholder={query.attribute} 
          items={attrChoices} 
          itemHandler={attrHandler}/>
        
      </div>
    </div>  
  )
}

export default SubType
