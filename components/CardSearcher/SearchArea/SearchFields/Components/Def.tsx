import styles from '../Styles/Field.module.scss'
import { Searcher } from '../../../Hooks/SearchTools';
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../Misc/globalContext';

export default function Def (searcher: {searcher:Searcher}){
  
  const {
    minDefHandler, 
    maxDefHandler, 
    minPlaceHolder, 
    maxPlaceHolder,} = Logic(searcher);

  return (
    <div className={styles.container}>
      <div className={styles.label}>Def</div>
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

  return {
    minDefHandler, 
    maxDefHandler, 
    minPlaceHolder, 
    maxPlaceHolder,}

}
