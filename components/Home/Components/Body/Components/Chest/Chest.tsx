import styles from './Chest.module.scss'

export interface Props{
  label?: string
}

export default function Chest ({label=''}: Props) {
  return  (
    <div className={styles.container}>
      {label}
    </div>
  )
}