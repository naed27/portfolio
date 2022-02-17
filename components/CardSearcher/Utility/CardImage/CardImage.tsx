import Image from 'next/image'
import { YGOCard } from '../../Misc/globalTypes';
import styles from './CardImage.module.scss';

interface Props {
  card:YGOCard, 
  limit:number,
  style?:React.CSSProperties
}

export default function CardImage ({
  card,
  limit,
  style
}:Props) {

  return (
    <> 
      {/* <Image 
      src={`${card.card_images[0].image_url}`} 
      alt='card'
      layout='fill'
      objectFit='contain'
      /> */}
      {limit<3&&(<div className={styles.limitContainer} style={style}>
      {limit}
      </div>)}
    </>
  )

}
