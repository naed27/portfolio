import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools';
import { useContext, useCallback, useState, useMemo } from 'react';
import Menu from './Menu';
import { GlobalContext } from '../../../Misc/globalContext';
import FieldCover from '../../../../../utility/FieldCover/FieldCover';
import TextCover from '../../../../../utility/TextCover/TextCover';

function Level ({searcher}: {searcher:Searcher}){
  
  const search = useCallback(searcher,[searcher]);

  const {query,cardTypes} = useContext(GlobalContext);
  const {levels} = cardTypes

  const levelChoices = query.type==='Monster'?levels:[];

  const minLevelHandler = (level:number)=>search({level:{min:level,max:query.level.max}})

  const maxLevelHandler = (level:number)=>search({level:{max:level,min:query.level.min}})

  const showCoverCondition = useMemo(()=> query.type!=='Monster',[query.type])

  return (
    <div className={styles.container}>
      <TextCover className={styles.label} showCover={showCoverCondition}>
        {`Level`}
      </TextCover>
      <div className={styles.wrapper}>

        <FieldCover className={styles.fieldWrapper} showCover={showCoverCondition}>
          <Menu
            className={styles.button}
            title={'races'}
            placeholder={query.level.min} 
            items={levelChoices} 
            itemHandler={minLevelHandler}/>
        </FieldCover>

        <TextCover className={styles.separator} showCover={showCoverCondition}>
          {`<`}
        </TextCover>

        <FieldCover className={styles.fieldWrapper} showCover={showCoverCondition}>
          <Menu
            className={styles.button}
            title={'races'}
            placeholder={query.level.max} 
            items={levelChoices} 
            itemHandler={maxLevelHandler}/>
        </FieldCover>

      </div>
    </div>  
  )
}

export default Level
