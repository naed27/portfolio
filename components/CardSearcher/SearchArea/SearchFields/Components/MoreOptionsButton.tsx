import { useContext, useState, useEffect } from 'react'
import { delay } from '../../../../../utility/functions';
import { GlobalContext } from '../../../Misc/globalContext'
import styles from '../Styles/MoreOptionsButton.module.scss'

export default function MoreOptionsButton () {

  const {setShowMoreFilters,showMoreFilters} = useContext(GlobalContext);

  const onClickHandler = () => {
    setShowMoreFilters(true)
  }

  return (
    <div className={styles.container} >
      <div className={styles.wrapper} onClick={onClickHandler}>
        {`More Filters >>`}
      </div>
    </div>  
  )
}

