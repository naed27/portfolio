import styles from './Styles/Field.module.scss'
import { Searcher } from '../../../../../Hooks/useSearcher';
import { GlobalContext } from '../../../../../../Context/context';
import { ChangeEvent, useCallback, useContext, useState, useEffect } from 'react'

export default function Continent ({searcher}: {searcher: Searcher}) {
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);
  const [placeHolder,setPlaceHolder] = useState(query.continent);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const queryInput = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({continent:input}), 200));
  }

  useEffect(()=>{
    setPlaceHolder(query.continent);
  },[query.continent])

  return (
    <div className={styles.container} >
    <div className={styles.label}>Continent</div>
      <div className={styles.wrapper}>
        <input 
          className={styles.input} 
          type="text" 
          onChange={queryInput} 
          spellCheck="false" 
          value={placeHolder}
        />
      </div>
    </div>  
  )
}


