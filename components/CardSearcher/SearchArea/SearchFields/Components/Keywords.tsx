import styles from '../Styles/Field.module.scss'
import { ChangeEvent, useCallback, useContext, useState, useEffect } from 'react'
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/globalContext';

export default function Keywords ({searcher}: {searcher:Searcher}){
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);
  const [placeHolder,setPlaceHolder] = useState(query.keywords);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const queryKeywords = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>{
      search({keywords:input})
    }, 500));
  }

  useEffect(()=>{
    setPlaceHolder(query.keywords);
  },[query.keywords])

  return (
    <div className={styles.container} >
    <div className={styles.label}>Keywords</div>
      <div className={styles.wrapper}>
        <input 
          className={styles.input} 
          type='text'
          onChange={queryKeywords} 
          spellCheck='false'
          value={placeHolder}
        />
      </div>
    </div>  
  )
}
