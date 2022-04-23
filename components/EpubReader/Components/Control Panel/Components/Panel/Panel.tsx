import { useCallback, useContext } from 'react'
import { ControlPanelContext } from '../../Context/Context'
import FileManager from './Components/File Manager/FileManager'
import Settings from './Components/Settings/Settings'
import TableContents from './Components/Table Contents/TableContents'
import styles from './Panel.module.scss'

export default function Panel () {

  const {showPanel} = useContext(ControlPanelContext);

  if(!showPanel) return null

  return (
    <div className={styles.container}>
      <FileManager/>
      <TableContents/>
      <Settings/>
    </div>
  )
}