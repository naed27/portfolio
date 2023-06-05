import { YGOCard } from '../../Misc/globalTypes';
import styles from './CardImage.module.scss';

interface Props {
  card:YGOCard, 
  limit:number,
  style?:React.CSSProperties
  showImages?:boolean
}

export default function CardImage ({
  card,
  limit,
  style,
  showImages = false
}:Props) {

  return (
    <div className={styles.wrapper}> 
      {showImages&&(
      <img 
      src={`${card.card_images[0].image_url}`}  
      alt={`${card.name}'s_image`} 
      style={{
        width: `100%`,
        height:'100%',
        objectFit: 'fill'
      }}/>
      )}
      {limit<3&&(<div className={styles.limitContainer} style={style}>{limit}</div>)}
    </div>
  )

}
