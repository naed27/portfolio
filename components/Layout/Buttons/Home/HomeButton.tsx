import styles from './HomeButton.module.scss';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function HomeButton () {
  
  return (

    <Link href={'/'} className={styles.container} passHref={true}>
      <FontAwesomeIcon icon={faArrowLeft} className={styles.homeButton}/>
    </Link>

  )
}

