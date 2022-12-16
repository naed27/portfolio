import styles from './HomeButton.module.scss';
import Link from 'next/link'


export default function HomeButton () {
  
  return (

      <Link href={'/'}>
        <a className={styles.container}> 
          <div className={styles.homeButton}>
          <div className={styles.base}></div>
          </div>
        </a>
      </Link>

  )
}

