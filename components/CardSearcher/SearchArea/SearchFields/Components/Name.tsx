import styles from '../Styles/Field.module.css'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/globalContext';

function Name ({searcher}: {searcher:Searcher}) {
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);
  const [placeHolder,setPlaceHolder] = useState(query.name);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const queryName = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>{
      search({name:input});
    }, 200));
  }

  return (
    <div className={styles.container} >
    <div className={styles.label}>Name</div>
      <div className={styles.wrapper}>
        <input 
          className={styles.input} 
          type="text" 
          onChange={queryName} 
          spellCheck="false" 
          value={placeHolder}
        />
      </div>
    </div>  
  )
}

export default Name
