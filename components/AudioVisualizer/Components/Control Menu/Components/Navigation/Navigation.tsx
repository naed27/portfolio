import { useContext } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';
import styles from './Navigation.module.scss'

export default function Navigation () {
  
  const { setAudioTitle, inputRef, playButtonRef, playing, audioTitle } = useContext(GlobalContext);

  const FileSelectedHandler = async (e:any) => 
   (e.target.files[0] && setAudioTitle) && setAudioTitle(e.target.files[0].name.slice(0, -4))
      
  return (
    <div className={styles.container}>
      
      <input id={'fileUpload'} ref={inputRef} type={'file'} accept={'audio/*'} onChange={FileSelectedHandler} />
      <label htmlFor="fileUpload" className={styles.audioButton}>Upload</label> 

      <div ref={playButtonRef} className={styles.audioButton}  style={{opacity:(audioTitle === null)?0.4:1}}>
        {playing ? 'Pause' : 'Play'}
      </div>
      
    </div>
  )
}