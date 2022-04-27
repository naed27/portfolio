import { useCallback, useContext, useEffect } from 'react'
import { changeFile } from '../../../../../../../Functions/FileHandlers';
import { GlobalContext } from '../../../../../../../Context/GlobalContext'
import styles from '../Contents.module.scss'

export default function FileInput() {

  const {setBookInfo, fileInputRef} = useContext(GlobalContext);

  const FileSelectedHandler = useCallback(async (e:any) => {
    if(!e.target.files[0]) return
    if(e.target.files[0].type !== 'application/epub+zip')
      return setBookInfo(null)
    return setBookInfo({
      title: e.target.files[0].name.slice(0, -4),
      author: null,
    })
  },[setBookInfo])

  useEffect(()=>{
    const fileInputDiv = fileInputRef.current;
    if(!fileInputDiv) return
    fileInputDiv.addEventListener('change',changeFile)  
    return () => fileInputDiv.removeEventListener('change',changeFile)
  },[fileInputRef])

  return (
    <>
      <input ref={fileInputRef} id={'fileUpload'} type={'file'} accept={'.epub'} onChange={FileSelectedHandler} />
      <label htmlFor="fileUpload" className={styles.item}>New File</label> 
    </>
  )
}