import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools'
import { GlobalContext } from '../../../Misc/globalContext'
import TextCover from '../../../../../utility/TextCover/TextCover'
import FieldCover from '../../../../../utility/FieldCover/FieldCover'
import { ChangeEvent, useCallback, useContext, useState } from 'react'

export default function Atk ({searcher}: {searcher:Searcher}){
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);
  const [minPlaceHolder,setMinPlaceHolder] = useState('');
  const [maxPlaceHolder,setMaxPlaceHolder] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);


  const minAtkHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return

    setMinPlaceHolder(`${input}`)
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({atk:{min:input,max:query.atk.max}}), 300));
  }

  const maxAtkHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return

    setMaxPlaceHolder(`${input}`)
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({atk:{max:input,min:query.atk.min}}), 300));
  }

  return (
    <div className={styles.container}>

      <TextCover className={styles.label} showCover={query.type!=='Monster'}>
        {`Attack`}
      </TextCover>

      <div className={styles.wrapper}>

        <FieldCover className={styles.fieldWrapper} showCover={query.type!=='Monster'}>
          <input 
            className={`${styles.input}`} 
            type="text" 
            onChange={minAtkHandler} 
            spellCheck="false"
            value={
              (query.type!=='Monster') ? '' :
              (minPlaceHolder==='-1') ? '' : minPlaceHolder
            }
          />
        </FieldCover>

        <TextCover className={styles.separator} showCover={query.type!=='Monster'}>
          {`<`}
        </TextCover>

        <FieldCover className={styles.fieldWrapper} showCover={query.type!=='Monster'}>
          <input 
            className={`${styles.input}`} 
            type="text" 
            onChange={maxAtkHandler} 
            spellCheck="false"
            value={
              (query.type!=='Monster') ? '' :
              (maxPlaceHolder==='-1') ? '' : maxPlaceHolder
            }
          />
        </FieldCover>

      </div>
    </div>  
  )
}
