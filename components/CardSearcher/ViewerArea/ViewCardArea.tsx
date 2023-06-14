import { useState } from 'react';
import Name from './Components/Name';
import Details from './Components/Details';
import { useContext, useRef } from 'react';
import Switches from './Components/Switches';
import { YGOCard } from '../Misc/globalTypes';
import styles from './ViewCardArea.module.scss';
import ImageViewer from './Components/ImageViewer';
import { GlobalContext } from '../Misc/globalContext';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

function ViewCardArea({card}:{card:YGOCard}) {

  const { setSelectedCard } = useContext(GlobalContext);

  const [showControllers, setShowControllers] = useState(false);

  const switchProps = { showControllers, setShowControllers }

  const modalRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(modalRef, () => setSelectedCard && setSelectedCard(null));

  return (
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalRef}>
        <Name card={card}/>
        <ImageViewer card={card}/>
        <Details card={card}/>
        <Switches props={switchProps}/>
      </div>
    </div>
  )
}

export default ViewCardArea
