import { useCallback, useContext } from 'react'
import { GlobalContext } from '../../../../../../../Context/GlobalContext'
import styles from '../Contents.module.scss'
import { getEpubFiles } from './Getters';

export default function EpubReceiver() {

  const {setEpub, setParsingStatus} = useContext(GlobalContext);

  const loadEpub = useCallback(async (e: any)=>{
    e.preventDefault();
    setParsingStatus(false)
    console.log('Parsing...')
    const file = e.target.files[0]
    const parsedEpub = await getEpubFiles(file)
    setEpub(parsedEpub)
    console.log('Done!')
  },[ setEpub, setParsingStatus ])

  return (
    <>
      <input id={'epub_reader_file_upload'} type={'file'} accept={'.epub'} onChange={loadEpub}/>
      <label htmlFor="epub_reader_file_upload" className={styles.item}>New File</label> 
    </>
  )
}
