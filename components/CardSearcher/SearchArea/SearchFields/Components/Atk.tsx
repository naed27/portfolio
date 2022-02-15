import styles from '../Styles/Field.module.scss'
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../../Misc/globalContext';
import { Searcher } from '../../../Hooks/SearchTools';
import FieldCover from '../../../../../utility/FieldCover/FieldCover';
import TextCover from '../../../../../utility/TextCover/TextCover';

function Atk ({searcher}: {searcher:Searcher}){
  
  const search = useCallback(searcher,[searcher]);
  const [minPlaceHolder,setMinPlaceHolder] = useState('');
  const [maxPlaceHolder,setMaxPlaceHolder] = useState('');

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);
  const {query} = useContext(GlobalContext);

  const minAtkHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value.length===0?-1:parseInt(e.target.value)
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({atk:{min:input,max:query.atk.max}}), 300));
    setMinPlaceHolder(e.target.value)
  }

  const maxAtkHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value.length===0?-1:parseInt(e.target.value)
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({atk:{max:input,min:query.atk.min}}), 300));
    setMaxPlaceHolder(e.target.value)
  }

  useEffect(()=>{
    setMinPlaceHolder('');
    setMaxPlaceHolder('');
  },[query.type])

  
  useEffect(()=>{
    if(query.atk.min === -1 || query.atk.max === -1){
      if(query.atk.min === -1 ) setMinPlaceHolder('');
      if(query.atk.max === -1) setMaxPlaceHolder('');
      return
    }
    setMinPlaceHolder(`${query.atk.min}`);
    setMaxPlaceHolder(`${query.atk.max}`);
  },[query.atk.min,query.atk.max])

  
  const showCoverCondition = useMemo(()=> query.type!=='Monster',[query.type])

  return (
    <div className={styles.container}>

      <TextCover className={styles.label} showCover={showCoverCondition}>
        {`Attack`}
      </TextCover>

      <div className={styles.wrapper}>

        <FieldCover className={styles.fieldWrapper} showCover={showCoverCondition}>
          <input 
            className={`${styles.input}`} 
            type="text" 
            onChange={minAtkHandler} 
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
            onChange={maxAtkHandler} 
            spellCheck="false"
            value={maxPlaceHolder}
          />
        </FieldCover>

      </div>
    </div>  
  )
}

export default Atk
