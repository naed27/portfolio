import Link from 'next/link';
import { useCallback, useContext } from 'react';
import { LayoutContext } from '../../../../../Layout/Context/LayoutContext';
import styles from './Chest.module.scss'

export interface Props{
  href: string, 
  label: string,
  hasNav?: boolean,
}

export default function Chest ({label, href, hasNav = true}: Props) {

  const {setAddress, setShowHeader} = useContext(LayoutContext);

  const process = useCallback((href: string) => {
    setAddress(href)
    setShowHeader(hasNav)
  },[hasNav, setAddress, setShowHeader])

  return  (
    <Link href={href}>
      <a className={styles.container} onClick={()=>process(href)}>
        {label}
      </a>
    </Link>
  )
}