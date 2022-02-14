import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools';
import { useContext, useCallback, useState } from 'react';
import Menu from './Menu';
import { GlobalContext } from '../../../Misc/globalContext';

function Level ({searcher}: {searcher:Searcher}){
  
  const search = useCallback(searcher,[searcher]);

  const {query,cardTypes} = useContext(GlobalContext);
  const {levels} = cardTypes

  const levelChoices = query.type==='Monster'?levels:[];

  const minLevelHandler = (level:number)=>search({level:{min:level,max:query.level.max}})

  const maxLevelHandler = (level:number)=>search({level:{max:level,min:query.level.min}})

  return (
    <div className={styles.container} >
      {query.type!=='Monster' &&(<div className={styles.cover}></div>)}
      <div className={styles.label}>Level</div>
      <div className={styles.wrapper}>

        <Menu
          title={'races'}
          placeholder={query.level.min} 
          items={levelChoices} 
          itemHandler={minLevelHandler}/>

        <div className={styles.separator}>{`<`}</div>

        <Menu
          title={'races'}
          placeholder={query.level.max} 
          items={levelChoices} 
          itemHandler={maxLevelHandler}/>

      </div>
    </div>  
  )
}

export default Level
