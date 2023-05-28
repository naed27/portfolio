import Link from 'next/dist/client/link';
import styles from './Sphere.module.scss'

export interface Props{
  href: string, 
  label: string,
}

const Sphere = ({label, href}: Props) => {

  return (
    <Link href={href}>
      <a className={styles.container}>
        {label}
      </a>
    </Link>
  )
};

export default Sphere;