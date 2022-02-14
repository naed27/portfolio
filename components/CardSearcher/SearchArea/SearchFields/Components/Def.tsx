import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools';
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Misc/globalContext';

export default function Def (searcher: {searcher:Searcher}){
  
  const {
    minDefHandler, 
    maxDefHandler, 
    minPlaceHolder, 
    maxPlaceHolder,
    query} = Logic(searcher);

  return (
    <div className={styles.container}>
      {query.type!=='Monster' &&(<div className={styles.cover}></div>)}
      <div className={styles.label}>Defense</div>
      <div className={styles.wrapper}>

        <input 
          className={`${styles.input}`} 
          type="text" 
          onChange={minDefHandler} 
          spellCheck="false"
          value={minPlaceHolder}
        />

        <div className={styles.separator}>{`<`}</div>

        <input 
          className={`${styles.input}`} 
          type="text" 
          onChange={maxDefHandler} 
          spellCheck="false"
          value={maxPlaceHolder}
        />
      </div>
    </div>  
  )
}

function Logic ({searcher}: {searcher:Searcher}){

  const search = useCallback(searcher,[searcher]);
  const [minPlaceHolder,setMinPlaceHolder] = useState('');
  const [maxPlaceHolder,setMaxPlaceHolder] = useState('');

  const {query} = useContext(GlobalContext);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const minDefHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = parseInt(e.target.value)

    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({def:{min:input,max:query.def.max}}), 300));
    setMinPlaceHolder(e.target.value)
  }

  const maxDefHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = parseInt(e.target.value)

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

  return {
    minDefHandler, 
    maxDefHandler, 
    minPlaceHolder, 
    maxPlaceHolder,
    query}
}
