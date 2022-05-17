import { useCallback, useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../../../../Context/GlobalContext'
import styles from '../Contents.module.scss'
import { getEpubFiles } from './Getters';

export default function EpubReceiver() {

  const {canvasRef, setEpub} = useContext(GlobalContext);

  const loadEpub = useCallback(async (e: any)=>{
    e.preventDefault();
    const file = e.target.files[0]
    const parsedEpub = await getEpubFiles(file)
    setEpub(parsedEpub)
    if(!canvasRef.current)return
  },[canvasRef,setEpub])

  return (
    <>
      <input id={'epub_reader_file_upload'} type={'file'} accept={'.epub'} onChange={loadEpub}/>
      <label htmlFor="epub_reader_file_upload" className={styles.item}>New File</label> 
    </>
  )
}
