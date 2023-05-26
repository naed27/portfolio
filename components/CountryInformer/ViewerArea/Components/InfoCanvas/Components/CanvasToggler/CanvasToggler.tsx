import styles from './CanvasToggler.module.scss'
import { useCallback, Dispatch, SetStateAction, useState } from 'react'

interface Props{
  viewState: "map" | "flag",
  toggleCallback: Dispatch<SetStateAction<"map" | "flag">>
}

const CanvasToggler = ({toggleCallback, viewState}:Props) => {

  const onClickHandler = useCallback(()=>{
    toggleCallback((current)=>current=='map'?'flag':'map')
  },[toggleCallback])

  return (
    <div className={styles.container}>
        <a onClick={onClickHandler} className={`${styles.button} ${viewState =='flag'? styles.active : styles.nonActive}`}>FLAG</a>
        <a onClick={onClickHandler} className={`${styles.button} ${viewState =='map'? styles.active : styles.nonActive}`}>MAP</a>
    </div>
  )
};

export default CanvasToggler;