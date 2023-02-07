import styles from './NoNetwork.module.scss'

export default function NoNetwork () {
  return (
    <div className={styles.container}>
      No Connection: Please check your network and refresh the page.
    </div>
  )
}