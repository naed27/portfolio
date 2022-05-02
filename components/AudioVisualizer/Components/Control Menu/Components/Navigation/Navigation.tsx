import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './Navigation.module.scss'

export default function Navigation () {
  
  const { setAudioTitle, inputRef, playButtonRef, playing, audioTitle } = useContext(GlobalContext);

  const FileSelectedHandler = async (e:any) => {
    if(!e.target.files[0] || !setAudioTitle) return
    if(e.target.files[0].type !== 'audio/mpeg')
      return setAudioTitle(null)
    return setAudioTitle(e.target.files[0].name.slice(0, -4))
  }
      
  return (
    <div className={styles.container}>
      
      <input id={'audio_visualizer_file_upload'} ref={inputRef} type={'file'} accept={'.mp3'} onChange={FileSelectedHandler} />
      <label htmlFor="audio_visualizer_file_upload" className={styles.audioButton}>Upload</label> 

      <div ref={playButtonRef} className={styles.audioButton}  style={{opacity:(audioTitle === null)?0.4:1}}>
        {playing ? 'Pause' : 'Play'}
      </div>
      
    </div>
  )
}