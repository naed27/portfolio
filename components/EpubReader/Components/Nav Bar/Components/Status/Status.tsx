import styles from './Status.module.scss'

export default function Status () {
  return (
    <div className={styles.container}>
      Book Title
      Book Author
      Current Chapter / Current Page  
    </div>
  )
}