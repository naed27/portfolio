import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools';
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../../Misc/globalContext';
import FieldCover from '../../../../../utility/FieldCover/FieldCover';
import TextCover from '../../../../../utility/TextCover/TextCover';

export default function Def ({searcher}: {searcher:Searcher}){
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);
  const [minPlaceHolder,setMinPlaceHolder] = useState(`${query.def.min}`);
  const [maxPlaceHolder,setMaxPlaceHolder] = useState(`${query.def.max}`);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const minDefHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return

    setMinPlaceHolder(`${input}`)
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({def:{min:input,max:query.def.max}}), 300));
  }

  const maxDefHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return

    setMaxPlaceHolder(`${input}`)
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({def:{max:input,min:query.def.min}}), 300));
  }

  return (
    <div className={styles.container}>

      <TextCover className={styles.label} showCover={query.type!=='Monster'}>
        {`Defense`}
      </TextCover>

      <div className={styles.wrapper}>
        <FieldCover className={styles.fieldWrapper} showCover={query.type!=='Monster'}>
          <input 
            className={`${styles.input}`} 
            type="text" 
            onChange={minDefHandler} 
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
            onChange={maxDefHandler} 
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
