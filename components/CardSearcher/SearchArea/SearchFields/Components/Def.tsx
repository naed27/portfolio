import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools';
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../../Misc/globalContext';
import FieldCover from '../../../../../utility/FieldCover/FieldCover';
import TextCover from '../../../../../utility/TextCover/TextCover';

export default function Def ({searcher}: {searcher:Searcher}){
  
  const search = useCallback(searcher,[searcher]);
  const [minPlaceHolder,setMinPlaceHolder] = useState('');
  const [maxPlaceHolder,setMaxPlaceHolder] = useState('');

  const {query} = useContext(GlobalContext);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const minDefHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input)) return

    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({def:{min:input,max:query.def.max}}), 300));
    setMinPlaceHolder(e.target.value)
  }

  const maxDefHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input)) return

    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({def:{max:input,min:query.def.min}}), 300));
    setMaxPlaceHolder(e.target.value)
  }

  useEffect(()=>{
    setMinPlaceHolder('');
    setMaxPlaceHolder('');
  },[query.type])

  useEffect(()=>{
    if(query.def.min === -1 || query.def.max === -1){
      if(query.def.min === -1 ) setMinPlaceHolder('');
      if(query.def.max === -1) setMaxPlaceHolder('');
      return
    }
    setMinPlaceHolder(`${query.def.min}`);
    setMaxPlaceHolder(`${query.def.max}`);
  },[query.def.min,query.def.max])

  const showCoverCondition = useMemo(()=> query.type!=='Monster',[query.type])

  return (
    <div className={styles.container}>

      <TextCover className={styles.label} showCover={showCoverCondition}>
        {`Defense`}
      </TextCover>

      <div className={styles.wrapper}>
        <FieldCover className={styles.fieldWrapper} showCover={showCoverCondition}>
          <input 
            className={`${styles.input}`} 
            type="text" 
            onChange={minDefHandler} 
            spellCheck="false"
            value={minPlaceHolder}
          />
        </FieldCover>

        <TextCover className={styles.separator} showCover={showCoverCondition}>
          {`<`}
        </TextCover>

        <FieldCover className={styles.fieldWrapper} showCover={showCoverCondition}>
          <input 
            className={`${styles.input}`} 
            type="text" 
            onChange={maxDefHandler} 
            spellCheck="false"
            value={maxPlaceHolder}
          />
        </FieldCover>
        
      </div>
    </div>  
  )
}
