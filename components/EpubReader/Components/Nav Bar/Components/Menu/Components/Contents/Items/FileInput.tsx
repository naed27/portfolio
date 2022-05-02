import { useCallback, useContext, useEffect } from 'react'
import { parseEpubfile } from '../../../../../../../Functions/FileHandlers';
import { GlobalContext } from '../../../../../../../Context/GlobalContext'
import styles from '../Contents.module.scss'

export default function FileInput() {

  const {setBookInfo, fileInputRef, setEpub , setParsingStatus} = useContext(GlobalContext);

  const parseWithAPI = useCallback(parseEpubfile,[parseEpubfile])

  const loadEpub = useCallback(async (e: any) => {
    e.preventDefault();
    if(!e.target.files[0]) return
    if(e.target.files[0].type !== 'application/epub+zip')
     return setBookInfo(null)

    console.log('Parsing Epub...')
    setParsingStatus(true)
    const epub = await parseWithAPI(e);
    setEpub(epub)
    setBookInfo({ title: e.target.files[0].name.slice(0, -4), author: null })
    setParsingStatus(false)

  },[setEpub, setParsingStatus, setBookInfo, parseWithAPI])

  useEffect(()=>{
    const ref = fileInputRef.current as HTMLInputElement
    ref.addEventListener('change', loadEpub)
    return () => ref.removeEventListener('change', loadEpub)
  },[fileInputRef, loadEpub])

  return (
    <>
      <input ref={fileInputRef} id={'epub_reader_file_upload'} type={'file'} accept={'.epub'} />
      <label htmlFor="epub_reader_file_upload" className={styles.item}>New File</label> 
    </>
  )
}
