import styles from '../Styles/ControlPanel.module.css'
import DeckStore from '../../Hooks/DeckStore';
import { YGOCard } from '../../Misc/globalTypes';

const ControlPanel = ()=>{

  const {setMainDeck,setExtraDeck,setSideDeck} = DeckStore();

  const compare = (a:YGOCard|null,b:YGOCard|null)=>{
    if(a===null||b==null)return 0;
    if(a.type<b.type)return -1;
    if(a.type===b.type){
      if(a.name<b.name)return -1;
      if(a.name>b.name)return 1;
      return 0
    }
    return 0;
  }

  const sortHandler = ()=>{
    if( setMainDeck===null||
        setSideDeck===null||
        setExtraDeck===null)return

    setMainDeck((current)=>[...current].sort(compare))
    setSideDeck((current)=>[...current].sort(compare))
    setExtraDeck((current)=>[...current].sort(compare))
  }

  const clearHandler = ()=>{
    if( setMainDeck===null||
        setSideDeck===null||
        setExtraDeck===null)return

    setMainDeck((current)=>Array(current.length).fill(null))
    setSideDeck((current)=>Array(current.length).fill(null))
    setExtraDeck((current)=>Array(current.length).fill(null))
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.btn} onClick={sortHandler}>Sort</div>
      </div>
      
      <div className={styles.clrWrapper}>
        <div className={styles.btn} onClick={clearHandler}>Clear</div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.btn}>Export</div>
      </div>
    </div>
  );

}

export default ControlPanel