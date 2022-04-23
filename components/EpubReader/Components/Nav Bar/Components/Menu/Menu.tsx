import styles from './Menu.module.scss';
import { useContext, useCallback, Dispatch, SetStateAction } from 'react';
import { GlobalContext } from '../../../../Context/GlobalContext';

export default function Menu() {

  const { toggleChapters, toggleFileManager, toggleSettings} = useContext(GlobalContext)

  return (
    <div className={styles.container}>

      <Toggler label = {'File Manager'} setter = {toggleFileManager}/> 
      <Toggler label = {'Chapters'} setter = {toggleChapters}/>
      <Toggler label = {'Settings'} setter = {toggleSettings}/>

    </div>
  );
}

interface TogglerParams{
  label: string
  setter: Dispatch<SetStateAction<boolean>>
}

function Toggler ({setter, label}: TogglerParams) {
  
  const {toggleNavBarContents: toggleMenu} = useContext(GlobalContext)

  const onClick = useCallback(()=> {
    toggleMenu(false)
    setter(current => !current)
  }, [setter, toggleMenu]);

  return (
    <div className={styles.button} onClick={onClick}>
      {label}
    </div>
  );
}