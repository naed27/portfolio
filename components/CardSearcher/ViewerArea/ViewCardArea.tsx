import styles from './ViewCardArea.module.css'
import CardImage from './Components/CardImage'
import Controls from './Components/Controls'
import Details from './Components/Details';
import Name from './Components/Name'
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useContext, useRef } from 'react';
import { YGOCard } from '../Misc/Types';
import { GlobalContext } from '../Misc/Context';

function ViewCardArea({card}:{card:YGOCard}) {

  const {
    setSelectedCard,
    searchIndex,
    setSearchIndex,
    searchedCards,
  } = useContext(GlobalContext);

  const props = {setSelectedCard,searchIndex,setSearchIndex,searchedCards,card};

  const modalRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(modalRef, () => setSelectedCard(null));

  return (
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalRef}>
        <Name card={card}/>
        <CardImage props={props}/>
        <Details card={card}/>
        <Controls props={props}/>
      </div>
    </div>
  )
}

export default ViewCardArea
