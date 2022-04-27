import styles from './Status.module.scss'

export default function Status () {
  return (
    <div className={styles.container}>

      <div className={styles.title}>
        {`The Wise Man's Fear`}
      </div>

      <div className={styles.author}>
        by Patrick Rothfuss
      </div>

      <div className={styles.page}>
        Chapter 98 - 2/20
      </div>
      
    </div>
  )
}