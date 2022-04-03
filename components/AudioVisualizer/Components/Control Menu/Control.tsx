import AudioTitle from './Components/Audio Title/AudioTitle'
import Navigation from './Components/Navigation/Navigation'
import ProgressBar from './Components/Progress Bar/ProgressBar'
import styles from './Control.module.scss'

export default function Control () {
  return (
    <div className={styles.container}>
      <ProgressBar/>
      <AudioTitle/>
      <Navigation/>
    </div>
  )
}