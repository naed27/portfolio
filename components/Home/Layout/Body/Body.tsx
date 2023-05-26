import styles from './Body.module.scss'

export default function Body ({children}:any){
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}