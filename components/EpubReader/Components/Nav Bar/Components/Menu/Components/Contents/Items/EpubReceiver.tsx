import { extractEpubLocally } from './Getters';
import styles from '../Contents.module.scss'
import { useCallback, useContext } from 'react'
import { GlobalContext } from '../../../../../../../Context/GlobalContext'

export default function EpubReceiver() {

  const {setEpub, setParsingStatus} = useContext(GlobalContext);

  const loadEpub = useCallback(async (e: any)=>{
    e.preventDefault();

    console.log('Extracting Epub...')
    setParsingStatus(true)

    setEpub(await extractEpubLocally(e.target.files[0]))

    setParsingStatus(false)
    console.log('Extraction Complete.')
  },[ setEpub, setParsingStatus ])

  return (
    <>
      <input id={'epub_reader_file_upload'} type={'file'} accept={'.epub'} onChange={loadEpub}/>
      <label htmlFor="epub_reader_file_upload" className={styles.item}>New File</label> 
    </>
  )
}
