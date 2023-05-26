import type { ReactNode } from "react";
import styles from './InfoCanvas.module.scss'

const InfoCanvas = ({children}:{children: ReactNode}) => {

  return (
    <div className={styles.container}>
        {children}
    </div>
  )
};

export default InfoCanvas;