import { useCallback, useMemo, useRef, useState } from 'react';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';
import { capitalizeFirstLetter, capitalizeProperly, isString } from '../../../Misc/globalFunctions';
import styles from '../Styles/Field.module.scss'

interface MenuProps {
  title:string,
  placeholder:string|number,
  items:(string|number)[],
  itemHandler:(value:any)=>void,
  showOnlyWhen?:boolean
}

function Menu ({title,placeholder,items,itemHandler,showOnlyWhen=true}:MenuProps) {

  const theItemHandler = useCallback(itemHandler, [itemHandler]);

  const [showMenu,setShowMenu] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonClickHandler = () => setShowMenu(current=>!current);
  useOnClickOutside(buttonRef, () => setShowMenu(false));

  const defaultValue = useCallback(()=>{
    const defaultVal = isString(items[0])?'':-1;
    theItemHandler(defaultVal);
  },[theItemHandler,items])

  const displayPlaceHolder = useCallback(()=>{
    if(
      placeholder===-1||
      placeholder===null||
      placeholder===undefined||
      placeholder===''
      )return ''
    return capitalizeProperly(placeholder);
  },[placeholder])

  const itemDivs:JSX.Element[] = useMemo(()=>{
    const choices =  items.map((item,i)=>(
      <div className={styles.item} key={`item_${title}_${i}`} onClick={()=>theItemHandler(item)}>
        { capitalizeProperly(item) }
      </div>
    ))
    return choices
  },[ title, items, theItemHandler ]);

  if(!showOnlyWhen)return null;

  return (
    <div className={styles.button} onClick={buttonClickHandler} ref={buttonRef}>
      <div className={styles.downLogo}></div>
      {displayPlaceHolder()}
      {(showMenu&&items.length>0)?<div className={styles.menu}>
        <div key={`item_${title}_default`} className={styles.item} onClick={defaultValue}>{`None`}</div>
      {itemDivs}
      </div>:null}
    </div>
  );
}

export default Menu