import styles from './ViewCardArea.module.css'
import CardImage from './Components/CardImage'
import Switches from './Components/Switches'
import Details from './Components/Details';
import Name from './Components/Name'
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useContext, useRef, useMemo } from 'react';
import { YGOCard } from '../Misc/globalTypes';
import { GlobalContext } from '../Misc/globalContext';
import { useState } from 'react';
import ControlPanel from './Components/ControlPanel';
import DeckStore from '../Hooks/DeckStore';

function ViewCardArea({card}:{card:YGOCard}) {

  const { setSelectedCard, showDeckBuilder } = useContext(GlobalContext);

  const [showControllers, setShowControllers] = useState(false);
  
  const deckFunctions = DeckStore();

  const switchProps = { showControllers, setShowControllers }

  const modalRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(modalRef, () => setSelectedCard && setSelectedCard(null));

  return (
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalRef}>
        <Name card={card}/>
        <CardImage card={card}/>
        {(()=>{
          if(showDeckBuilder===false)
            return <Details card={card}/>
          return (
            <>
              {!showControllers ?
              <Details card={card}/> :
              <ControlPanel card={card} functions={deckFunctions}/>}
            </>
          )
        })()}
        <Switches props={switchProps}/>
      </div>
    </div>
  )
}

export default ViewCardArea
