import styles from '../Styles/Field.module.scss'
import { useCallback, useContext, useMemo } from 'react'
import { Searcher } from '../../../Hooks/SearchTools';
import { GlobalContext } from '../../../Misc/globalContext';
import Menu from './Menu';

export default function CardGame ({searcher}: {searcher:Searcher}){
  
  const {query} = useContext(GlobalContext);
  const search = useCallback(searcher,[searcher]);

  const queryCardGame = useCallback((input:string)=> search({cardGame:input}),[search]);
  const cardGameChoices = useMemo(()=>['O.C.G.', 'T.C.G.'],[]);

  return (
    <div className={styles.container} >
      <div className={styles.label}>TCG/OCG</div>
      <div className={styles.wrapper}>
      <Menu 
        className={styles.button} 
        title={'card_game'}
        placeholder={query.limit} 
        items={cardGameChoices} 
        itemHandler={queryCardGame}/>
      </div>
    </div>
  )
}
