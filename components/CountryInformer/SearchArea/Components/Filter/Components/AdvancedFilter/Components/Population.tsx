import styles from './Styles/Field.module.scss'
import { Searcher } from '../../../../../Hooks/useSearcher';
import { GlobalContext } from '../../../../../../Context/context';
import { ChangeEvent, useCallback, useContext, useState, useEffect, useMemo } from 'react'

export default function Population ({searcher}: {searcher: Searcher}) {
  
  const search = useCallback(searcher,[searcher]);
  const [minPlaceHolder,setMinPlaceHolder] = useState('');
  const [maxPlaceHolder,setMaxPlaceHolder] = useState('');

  const {query} = useContext(GlobalContext);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const minPopulationHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input)) return
    
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({population:{min:input,max:query.population.max}}), 300));
    setMinPlaceHolder(e.target.value)
  }

  const maxPopulationHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input)) return

    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({population:{max:input,min:query.population.min}}), 300));
    setMaxPlaceHolder(e.target.value)
  }

  useEffect(()=>{
    if(query.population.min === -1 || query.population.max === -1){
      if(query.population.min === -1 ) setMinPlaceHolder('');
      if(query.population.max === -1) setMaxPlaceHolder('');
      return
    }
    setMinPlaceHolder(`${query.population.min}`);
    setMaxPlaceHolder(`${query.population.max}`);
  },[query.population.min,query.population.max])


  return (
    <div className={styles.container}>

      <div className={styles.label}>{'Population'}</div>

      <div className={styles.wrapper}>
          <input 
            className={styles.input} 
            type="text" 
            onChange={minPopulationHandler} 
            spellCheck="false"
            value={minPlaceHolder}
          />
        
        <div className={styles.minipad}>
          {`<`}
        </div>

          <input 
            className={styles.input} 
            type="text" 
            onChange={maxPopulationHandler} 
            spellCheck="false"
            value={maxPlaceHolder}
          />
        
      </div>
    </div>  
  )
}


