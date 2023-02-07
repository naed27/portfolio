import Menu from './Menu'
import { useContext, useCallback } from 'react'
import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools'
import { GlobalContext } from '../../../Misc/globalContext'
import FieldCover from '../../../../../utility/FieldCover/FieldCover'
import TextCover from '../../../../../utility/TextCover/TextCover'

export default function Level ({searcher}: {searcher:Searcher}){
  
  const search = useCallback(searcher,[searcher]);

  const {query,cardTypes} = useContext(GlobalContext);
  const {levels} = cardTypes

  const levelChoices = query.type==='Monster'?levels:[];

  const minLevelHandler = (level:number)=>search({level:{min:level,max:query.level.max}})

  const maxLevelHandler = (level:number)=>search({level:{max:level,min:query.level.min}})


  return (
    <div className={styles.container}>
      <TextCover className={styles.label} showCover={query.type!=='Monster'}>
        {`Level`}
      </TextCover>
      <div className={styles.wrapper}>

        <FieldCover className={styles.fieldWrapper} showCover={query.type!=='Monster'}>
          <Menu
            className={styles.button}
            title={'races'}
            placeholder={query.level.min} 
            items={levelChoices} 
            itemHandler={minLevelHandler}/>
        </FieldCover>

        <TextCover className={styles.separator} showCover={query.type!=='Monster'}>
          {`<`}
        </TextCover>

        <FieldCover className={styles.fieldWrapper} showCover={query.type!=='Monster'}>
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
