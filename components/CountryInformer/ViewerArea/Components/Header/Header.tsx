import { ReactNode } from "react";
import styles from './Header.module.scss'


export default function Header ({children}:{children: ReactNode}) {

  return (
    <div className={styles.container}>
        {children}
    </div>
  )

}