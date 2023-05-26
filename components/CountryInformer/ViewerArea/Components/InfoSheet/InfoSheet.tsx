import type { ReactNode } from "react";
import styles from './InfoSheet.module.scss'

const InfoSheet = ({children}:{children: ReactNode}) => {

  return (
    <div className={styles.container}>
        {children}
    </div>
  )
};

export default InfoSheet;