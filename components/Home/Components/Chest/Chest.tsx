import Link from 'next/link';
import styles from './Chest.module.scss'

export interface Props{
  href: string, 
  label: string,
}

const Chest = ({label, href}: Props) => {

  return  (
    <Link href={href} className={styles.container}>
      {label}
    </Link>
  )
}

export default Chest