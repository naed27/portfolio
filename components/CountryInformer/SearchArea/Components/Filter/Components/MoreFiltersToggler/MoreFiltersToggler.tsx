import { useContext } from 'react'
import styles from './MoreFiltersToggler.module.scss'
import { GlobalContext } from '../../../../../Context/context'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function MoreFiltersToggler () {

  const {setShowMoreFilters} = useContext(GlobalContext);

  const onClickHandler = () => setShowMoreFilters(true)

  return (
    <div className={styles.container} onClick={onClickHandler}>

      <FontAwesomeIcon 
        icon={faFilter} 
        className={styles.filterLogo}
      ></FontAwesomeIcon>
      
      {` \n More Filters`}

    </div>
  )

}