import Filter from './Components/Filter/Filter'
import Table from './Components/Table/Table'
import styles from './SearchArea.module.scss'


export default function SearchArea () {

  return (
    <div className={styles.container}>
      <Filter/>
      <Table/>
    </div>
  )

}