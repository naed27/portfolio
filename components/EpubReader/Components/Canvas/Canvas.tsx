import styles from './Canvas.module.scss';
import {useContext, useEffect, useState} from 'react'
import { GlobalContext } from '../../Context/GlobalContext'

export default function Canvas () {
  const {epub} = useContext(GlobalContext);

  return (
    <div className={styles.container}>
      {epub.length>0&&<div dangerouslySetInnerHTML={{__html:epub[10].rawText}} />}
    </div>
  )
}