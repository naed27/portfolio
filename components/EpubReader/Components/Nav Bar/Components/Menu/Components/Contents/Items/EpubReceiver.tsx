import { useCallback, useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../../../../Context/GlobalContext'
import styles from '../Contents.module.scss'
import epub from 'epubjs'
import { getEpubFiles, getEpubTexts } from './Getters';

export default function EpubReceiver() {

  const {canvasRef} = useContext(GlobalContext);

  const loadEpub = useCallback(async (e: any)=>{
    e.preventDefault();
    const file = e.target.files[0]
    const { images } = getEpubFiles(file)
    const { chapters } = await getEpubTexts(file)
    if(!canvasRef.current)return
  },[canvasRef])

  return (
    <>
      <input id={'epub_reader_file_upload'} type={'file'} accept={'.epub'} onChange={loadEpub}/>
      <label htmlFor="epub_reader_file_upload" className={styles.item}>New File</label> 
    </>
  )
}
