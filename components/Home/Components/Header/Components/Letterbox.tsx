import styles from './Letterbox.module.scss'

export interface Props{
  letter: string;
}

export default function Letterbox ({letter}: Props) {
  return (
    <div className={styles.container}>
      {letter}
    </div>
  )
}