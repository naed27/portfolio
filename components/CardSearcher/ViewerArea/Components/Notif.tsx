import styles from '../Styles/Notif.module.scss';
import { NotifType } from '../../Misc/Types';
import { motion } from 'framer-motion'
import { addToDeck,error, removeFromDeck } from '../Animations/Notif';
import Image from 'next/image'

export default function Notif({ notif:{ card, message, action } } : { notif:NotifType }) {

  return (
    <div className={styles.container}>
      {
        action==='add'||'remove'?
        <motion.div className={styles.image}
        variants={message==='card added'?addToDeck:removeFromDeck}
        initial='initial'
        animate='final'>
          {card&&<Image 
            src={`${card.card_images[0].image_url_small}`} 
            alt='card image'
            layout='fill'
            objectFit='contain'
          />}
        </motion.div>
        :
        <motion.div className={styles.error}
        variants={error}
        initial='initial'
        animate='final'>
          {message}
        </motion.div>
      }
    </div>
  )
}