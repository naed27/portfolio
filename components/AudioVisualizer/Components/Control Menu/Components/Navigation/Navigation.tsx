import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './Navigation.module.scss'

export default function Navigation () {
  
  const { inputRef, playButtonRef, audioPlayingStatus, audioTitle } = useContext(GlobalContext);
      
  return (
    <div className={styles.container}>
      
      <input id={'audio_visualizer_file_upload'} ref={inputRef} type={'file'} accept={'.mp3'} />
      <label htmlFor="audio_visualizer_file_upload" className={styles.audioButton}>Upload</label> 

      <div ref={playButtonRef} className={styles.audioButton}  style={{opacity:(audioTitle === null)?0.4:1}}>
        {audioPlayingStatus ? 'Pause' : 'Play'}
      </div>
      
    </div>
  )
}