import styles from '../Styles/Field.module.css'
import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/Context';

function Desc ({searcher}: {searcher:Searcher}){
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);
  const [placeHolder,setPlaceHolder] = useState(query.desc);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const queryDesc = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    setPlaceHolder(input);
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>{
      search({desc:input})
    }, 500));
  }

  return (
    <div className={styles.container} >
    <div className={styles.label}>Desc</div>
      <div className={styles.wrapper}>
        <input 
          className={styles.input} 
          type="text" 
          onChange={queryDesc} 
          spellCheck="false"
          value={placeHolder}
        />
      </div>
    </div>  
  )
}

export default Desc