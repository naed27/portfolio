import AudioTitle from './Components/Audio Title/AudioTitle'
import Navigation from './Components/Navigation/Navigation'
import AudioTrack from './Components/AudioTrack/AudioTrack'
import styles from './Control.module.scss'

export default function Control () {
  return (
    <div className={styles.container}>
      <AudioTitle/>
      <AudioTrack/>
      <Navigation/>
    </div>
  )
}