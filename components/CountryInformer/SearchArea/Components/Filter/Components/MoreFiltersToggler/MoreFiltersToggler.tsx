import { useContext } from 'react';
import { GlobalContext } from '../../../../../Context/context';
import styles from './MoreFiltersToggler.module.scss'

export default function MoreFiltersToggler () {

  const {setShowMoreFilters} = useContext(GlobalContext);

  const onClickHandler = () => setShowMoreFilters(true)

  return (
    <div className={styles.container} onClick={onClickHandler}>
      {`More Filters >>`}
    </div>
  )

}