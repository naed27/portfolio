import styles from '../Styles/Controller.module.scss';
import { useRef, useState, useMemo} from 'react';
import { NotifType,YGOCard } from '../../Misc/Types';
import { AnimatePresence, motion } from 'framer-motion'
import Notif from './Notif';
import DeckStore from '../../Hooks/DeckStore';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';
import { controllerMotion } from '../Animations/Controller';
import { capitalizeFirstLetter,getCardLimit,getCardCategory } from '../../Misc/Functions';

export default function Controller({card,deck}:{card:YGOCard,deck:string}){

  const {addToDeck,removeFromDeck,getDeckCardCount,getExistingCardCount} = DeckStore();
  const [notifs,setNotifs] = useState<NotifType[]>([]);
  const [showcontrols,setShowControls] = useState(false);
  const [switchLock,setSwitchLock] = useState(false);
  const deckType = deck==='main'?getCardCategory(card):deck;

  const cardcount = useMemo(()=>getDeckCardCount(card,deck),[card,deck,getDeckCardCount]);
  const [overAllCardCount,setOverAllCardCount] = useState(getExistingCardCount(card));
  const [cardLimit,setCardLimit] = useState(getCardLimit(card));

  const buttonRef = useRef(null);
  useOnClickOutside(buttonRef, () => showcontrols?setShowControls(false):null);

  const notify = (action:string)=>{
    if(switchLock && action==='remove')return
    if(action==='add'){
      setSwitchLock(true);
      setTimeout(()=>{setSwitchLock(false)},700)
    }
    const result = action==='add'?addToDeck(deck,card):removeFromDeck(deck,card);
    if(result===null)return
    const {status,message} = result;

    if(status<1)return
    
    const id = `notif_${Date.now()}`;
    const delay = message==='card added'||message==='card removed'?700:3000;
    const timer = setTimeout(()=>setNotifs((curr)=>curr.filter((n)=>n.id!==id)),delay)
    const notif = {id,card,timer,message,deck,action}
    setNotifs((current)=>[...current,notif]);
  }

  return (
    <div className={styles.button} ref={buttonRef}>
        <div className={styles.notifications}>
          <AnimatePresence>
            {notifs.map((notif)=><Notif key={`ntf_${deck}_${notif.id}`} notif={notif} />)}
          </AnimatePresence>
        </div>

        <div className={styles.label} onClick={()=>{setShowControls((c)=>!c)}}>
          {`${capitalizeFirstLetter(deckType)} (${cardcount})`}
        </div>
        
        <AnimatePresence>
          {showcontrols&&
          <motion.div className={styles.controllers}
          variants={controllerMotion}
          initial='initial'
          animate='final'
          exit='exit'>
            <div className={styles.controller}onClick={()=>notify('add')}>+
            {(overAllCardCount===cardLimit)&&
              <div className={styles.coverWrapper}>
                <div className={styles.cover}></div>
              </div>}
            </div>
            <div className={styles.controller}onClick={()=>notify('remove')}>-
            {(cardcount===0)&&
              <div className={styles.coverWrapper}>
                <div className={styles.cover}></div>
              </div>}
            </div>
          </motion.div>}
        </AnimatePresence>
    </div>
  )
}

