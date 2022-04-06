import Body from './Components/Body/Body'
import Header from './Components/Header/Header'
import styles from './Home.module.scss'

export default function Home () {
  return (
    <div className={styles.container}>
      <Header/>
      <Body/>
    </div>
  )
}