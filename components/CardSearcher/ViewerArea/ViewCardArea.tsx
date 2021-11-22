import styles from './ViewCardArea.module.css'
import CardImage from './Components/CardImage'
import Switches from './Components/Switches'
import Details from './Components/Details';
import Name from './Components/Name'
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useContext, useRef } from 'react';
import { YGOCard } from '../Misc/Types';
import { GlobalContext } from '../Misc/Context';
import { useState } from 'react';
import ControlPanel from './Components/ControlPanel';

function ViewCardArea({card}:{card:YGOCard}) {

  const {
    setSelectedCard,
    searchIndex,
    setSearchIndex,
    searchedCards,
  } = useContext(GlobalContext);

  const [showControllers, setShowControllers] = useState(false);

  const imageProps = {setSelectedCard,searchIndex,setSearchIndex,searchedCards,card};
  const switchProps = {setSelectedCard,setShowControllers};

  const modalRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(modalRef, () => setSelectedCard(null));

  return (
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalRef}>
        <Name card={card}/>
        <CardImage props={imageProps}/>
        {!showControllers?
        <Details card={card}/>:
        <ControlPanel card={card}/>
        }
        <Switches props={switchProps}/>
      </div>
    </div>
  )
}

export default ViewCardArea
