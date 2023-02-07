import Menu from './Menu'
import { useCallback, useContext } from 'react'
import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools'
import { GlobalContext } from '../../../Misc/globalContext'
import FieldCover from '../../../../../utility/FieldCover/FieldCover'
import TextCover from '../../../../../utility/TextCover/TextCover'

export default function SubType ({searcher}: {searcher:Searcher}){

  const search = useCallback(searcher,[searcher]);
  
  const {query,cardTypes} = useContext(GlobalContext);

  const {races,attributes} = cardTypes

  const raceChoices = query.type==='Monster'?races:[];
  const attrChoices = query.type==='Monster'?attributes:[];

  const raceHandler = (input:string)=>search({race:input});

  const attrHandler = (input:string)=>search({attribute:input});


  return (
      <div className={styles.container}>
         <TextCover className={styles.label} showCover={query.type!=='Monster'}>
          {`Sub-Type`}
        </TextCover>
          <div className={styles.wrapper}>

            <FieldCover className={styles.fieldWrapper} showCover={query.type!=='Monster'}>
              <Menu
                className={styles.button}
                title={'races'}
                placeholder={query.race} 
                items={raceChoices} 
                itemHandler={raceHandler}/>
            </FieldCover>
           
            <div className={styles.separator}></div>

            <FieldCover className={styles.fieldWrapper} showCover={query.type!=='Monster'}>
              <Menu
                className={styles.button}
                title={'attributes'}
                placeholder={query.attribute} 
                items={attrChoices} 
                itemHandler={attrHandler}/>
            </FieldCover>
            
          </div>
      </div>
  )
}

