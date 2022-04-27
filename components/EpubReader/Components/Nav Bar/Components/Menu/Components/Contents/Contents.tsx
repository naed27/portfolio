import { useContext, useRef } from 'react'
import useOnClickOutside from '../../../../../../../../hooks/useOnClickOutside';
import { GlobalContext } from '../../../../../../Context/GlobalContext';
import styles from './Contents.module.scss'
import FileInput from './Items/FileInput';
import SettingsToggler from './Items/ToggleSettings';

export default function Contents() {

  
  const menuRef = useRef<HTMLDivElement>(null);

  const { showMenuContents, toggleMenuContents } = useContext(GlobalContext);

  useOnClickOutside(menuRef, () => {
    showMenuContents && toggleMenuContents(false)
  });

  if(!showMenuContents) return null

  return (
    <div className={styles.container} ref={menuRef}>

      <FileInput/>
      <SettingsToggler/>
      
    </div>
  )
}
