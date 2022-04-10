import Link from 'next/link';
import styles from './Chest.module.scss'

export interface Props{
  href: string, 
  label: string,
}

export default function Chest ({label, href}: Props) {

  return  (
    <Link href={href}>
      <a className={styles.container}>
        {label}
      </a>
    </Link>
  )
}