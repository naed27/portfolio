import Link from 'next/link';
import styles from './Chest.module.scss'

export interface Props{
  href: string, 
  label: string,
}

const Chest = ({label, href}: Props) => {

  return  (
    <Link href={href}>
      <a className={styles.container}>
        {label}
      </a>
    </Link>
  )
}

export default Chest