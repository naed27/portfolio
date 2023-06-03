import styles from './NoNetwork.module.scss'
import { v4 as uuidv4 } from 'uuid'

const NoNetwork = () => {
  return (
    <div className={styles.container} key={`${uuidv4()}`}>
      No Connection: Please check your network and refresh the page.
    </div>
  )
}

export default NoNetwork