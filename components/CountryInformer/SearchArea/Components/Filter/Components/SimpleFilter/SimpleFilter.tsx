import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../../Context/context';
import { Searcher } from '../../../../Hooks/useSearcher';
import styles from './SimpleFilter.module.scss'

export default function SimpleFilter ({searcher}:{searcher: Searcher}) {

  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);
  const [placeHolder,setPlaceHolder] = useState(query.name);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const queryName = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({name:input}), 200));
  }

  useEffect(()=>{
    setPlaceHolder(query.name);
  },[query.name])

  return (
    <div className={styles.container}>
      <input 
        className={styles.input} 
        type='text' 
        onChange={queryName} 
        spellCheck='false' 
        value={placeHolder}
        placeholder='Search by Name'
      />
    </div>
  )

}