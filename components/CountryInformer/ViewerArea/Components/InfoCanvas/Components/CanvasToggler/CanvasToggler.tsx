import styles from './CanvasToggler.module.scss'

const CanvasToggler = () => {

  return (
    <div className={styles.container}>
        <a className={styles.button}>VIEW FLAG</a>
        <a className={styles.button}>VIEW MAP</a>
    </div>
  )
};

export default CanvasToggler;