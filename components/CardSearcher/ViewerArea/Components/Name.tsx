import { YGOCard } from '../../Misc/Types';
import styles from '../Styles/Name.module.scss';

export default function Name({card}:{card:YGOCard}){

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        {card.name}
      </div>
    </div>
  )
}

