import styles from './Styles/Field.module.scss'
import { ChangeEvent, useCallback, useContext, useState, useEffect, memo } from 'react'
import { GlobalContext } from '../../../../../../Context/context';
import { Searcher } from '../../../../../Hooks/useSearcher';

const Name = ({searcher}: {searcher: Searcher}) => {
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);
  const [placeHolder,setPlaceHolder] = useState(query.name);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const queryInput = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({name:input}), 200));
  }

  useEffect(()=>{
    setPlaceHolder(query.name);
  },[query.name])

  return (
    <div className={styles.container} >
    <div className={styles.label}>Name</div>
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

export default memo(Name)
