import { useContext, useRef } from 'react'
import useOnClickOutside from '../../../../../../../../hooks/useOnClickOutside';
import { GlobalContext } from '../../../../../../Context/GlobalContext';
import styles from './Contents.module.scss'
import EpubReceiver from './Items/EpubReceiver';
import SettingsToggler from './Items/SettingsToggler';

export default function Contents() {
  
  const menuRef = useRef<HTMLDivElement>(null);

  const { showMenuContents, toggleMenuContents } = useContext(GlobalContext);

  useOnClickOutside(menuRef, () => {
    showMenuContents && toggleMenuContents(false)
  });

  if(!showMenuContents) return null

  return (
    <div className={styles.container} ref={menuRef}>

      <EpubReceiver/>
      <SettingsToggler/>
      
    </div>
  )
}
