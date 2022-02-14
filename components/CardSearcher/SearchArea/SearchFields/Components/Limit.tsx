import styles from '../Styles/Field.module.scss'
import { useCallback, useContext, useMemo } from 'react'
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/globalContext';
import Menu from './Menu';

export default function Limit ({searcher}: {searcher:Searcher}){
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);

  const queryLimit = useCallback((input:number)=> search({limit:input}),[search]);
  const limitChoices = useMemo(()=>[0,1,2,3],[]);

  return (
    <div className={styles.container} >
      <div className={styles.label}>Limit</div>
      <div className={styles.wrapper}>
        <Menu 
          title={'card_limit'}
          placeholder={query.limit} 
          items={limitChoices} 
          itemHandler={queryLimit}/>
      </div>
    </div>
  )
}
