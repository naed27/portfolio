import { useContext } from 'react';
import { GlobalContext } from '../../Misc/Context';
import styles from '../Styles/NavBar.module.css';

export default function NavBar() {

  const {toggleDeck,toggleSearcher,showDeck,showSearcher} = useContext(GlobalContext)

  const handleClick = (label:string) => {
    if(label === 'deck'){
      if(showDeck)return
      toggleSearcher(false)
      toggleDeck(true)
    }
    if(label === 'searcher'){
      if(showSearcher)return
      toggleSearcher(true)
      toggleDeck(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.item} onClick={()=>handleClick('searcher')}>Searcher</div>
        <div className={styles.item} onClick={()=>handleClick('deck')}>Deck</div>
      </div>
    </div>
     
  )
}