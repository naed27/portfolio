import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './AudioTrack.module.scss'

export default function AudioTrack () {

  const {
    audioDurationRef,  
    audioCurrentTimeRef,
    audioTrackSliderPointRef, 
    audioTrackSliderProgressRef,
    audioTrackSliderContainerRef, 
  } = useContext(GlobalContext)

  return (
    <div ref={audioTrackSliderContainerRef} className={styles.audioTrackContainer}>
      <div className={styles.audioTimeTracker}>
        <div ref={audioCurrentTimeRef} className={styles.audioTime} data-timevalue="0:00"></div> 
        <div ref={audioDurationRef} className={styles.audioTime} data-timevalue="0:00"></div>
      </div>
      <div  className={styles.audioTrackSliderContainer}>
        <div ref={audioTrackSliderProgressRef} className={styles.audioTrackProgress}>
          <div className={styles.audioTrackSliderCircleContainer}>
            <div ref={audioTrackSliderPointRef} className={styles.audioTrackSliderCircle}/>
          </div>
        </div>
      </div>
    </div>
   
  )
}