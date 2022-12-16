import { useContext } from 'react';
import styles from './HomeButton.module.scss';
import { LayoutContext } from '../../Context/LayoutContext';
import Link from 'next/link'


export default function HomeButton () {
  
  const { } = useContext(LayoutContext)
  
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

