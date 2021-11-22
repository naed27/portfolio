import { useCallback } from "react";
import { YGOCard } from "../../Misc/Types";
import styles from "../Styles/ControlPanel.module.scss";
import Controller from './Controller';

export default function ControlPanel({card}:{card:YGOCard}){


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Stock: {1}
        </div>
        <div className={styles.body}>
          <div className={styles.deck}>
            <Controller card={card} deck={'main'}/>
          </div>
          <div className={styles.deck}>
            <Controller card={card} deck={'side'}/>
          </div>
        </div>
      </div>
    </div>
  )
}