import { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../../../Misc/globalContext'
import styles from '../Styles/MoreOptionsButton.module.scss'
import { FilterIcon } from 'lucide-react'

export default function MoreOptionsButton () {

  const { setShowMoreFilters } = useContext(GlobalContext);

  const onClickHandler = () => {
    setShowMoreFilters(true)
  }

  return (
    <div className={styles.container} >
      <div className={styles.wrapper} onClick={onClickHandler}>
        <FilterIcon size={'18px'}/>
        {`Filter`}
      </div>
    </div>  
  )
}

