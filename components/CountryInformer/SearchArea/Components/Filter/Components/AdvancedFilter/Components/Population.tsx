import styles from './Styles/Field.module.scss'
import { Searcher } from '../../../../../Hooks/useSearcher';
import { GlobalContext } from '../../../../../../Context/context';
import { ChangeEvent, useCallback, useContext, useState } from 'react'

export default function Population ({searcher}: {searcher: Searcher}) {
  
  const {query} = useContext(GlobalContext);

  const search = useCallback(searcher,[searcher]);
  const [minPlaceHolder,setMinPlaceHolder] = useState(`${query.population.min}`);
  const [maxPlaceHolder,setMaxPlaceHolder] = useState(`${query.population.max}`);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout|null>(null);

  const minPopulationHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return
    if(input < 0 || input > 100000000000) return
    
    setMinPlaceHolder(`${input}`)
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({population:{min:input,max:query.population.max}}), 300));
  }

  const maxPopulationHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value==='' ? -1 : Number(e.target.value)
    if(isNaN(input) && e.target.value !== '') return
    if(input < 0 || input > 100000000000) return

    setMaxPlaceHolder(`${input}`)
    if(typingTimeout)clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(()=>search({population:{max:input,min:query.population.min}}), 300));
  }

  return (
    <div className={styles.container}>

      <div className={styles.label}>{'Population'}</div>

      <div className={styles.wrapper}>
          <input 
            className={styles.input} 
            type="text" 
            onChange={minPopulationHandler} 
            spellCheck="false"
            value={(minPlaceHolder==='-1') ? '' : minPlaceHolder}
          />
        
        <div className={styles.minipad}>
          {`<`}
        </div>

          <input 
            className={styles.input} 
            type="text" 
            onChange={maxPopulationHandler} 
            spellCheck="false"
            value={(maxPlaceHolder==='-1') ? '' : maxPlaceHolder}
          />
        
      </div>
    </div>  
  )
}


