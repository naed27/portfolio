import Image from 'next/image'
import { Country } from '../../Types/types';
import styles from './FlagImage.module.scss';

interface Props {
  country: Country, 
}

export default function FlagImage ({ country }:Props) {

  return (
    <div className={styles.wrapper}> 
      <Image 
      src={`${country.flags.png}`} 
      alt={`${country.name.common}'s_flag`}
      layout='fill'
      objectFit='cover'
      unoptimized
      />
    </div>
  )

}
