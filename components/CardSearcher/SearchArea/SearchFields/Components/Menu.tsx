import { useCallback, useMemo, useRef, useState } from 'react';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';
import ScrollableDiv from '../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { capitalizeProperly, isString } from '../../../Misc/globalFunctions';
import styles from '../Styles/Menu.module.scss'

interface MenuProps {
  className?: string;
  title:string,
  placeholder:string|number,
  items:(string|number)[],
  itemHandler:(value:any)=>void,
  showOnlyWhen?:boolean
  noDefault?:boolean
  defaultText?:string
  defaultValue?:string|number
}

function Menu ({
  className='',
  title,
  placeholder,
  items,
  itemHandler,
  showOnlyWhen=true,
  noDefault=false,
  defaultText='None',
  defaultValue
}:MenuProps) {

  const theItemHandler = useCallback(itemHandler, [itemHandler]);

  const [showMenu,setShowMenu] = useState(false);
  const [holdMenu,setHoldMenu] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(buttonRef, () => setShowMenu(false));

  const menuItems  = useMemo(()=>items,[items]);
  const menuTitle = useMemo(()=>title,[title]);

  const mouseInsideMenu = () => setHoldMenu(true)
  const mouseOutsideMenu = () => setHoldMenu(false)
  const buttonClickHandler = () => !holdMenu&&setShowMenu(current=>!current);

  const displayPlaceHolder = useCallback(()=>{
    if(
      placeholder===-1||
      placeholder===null||
      placeholder===undefined||
      placeholder===''
      )return ''
    return capitalizeProperly(placeholder);
  },[placeholder])

  const itemClickHandler = useCallback((item:string|number) =>{
    theItemHandler(item);
    setShowMenu(false);
    setHoldMenu(false);
  },[theItemHandler])

  const defaultClickHandler = useCallback(()=>{
    const defaultVal = (()=>{
      if(defaultValue) return defaultValue
      if(isString(menuItems[0]))
        return ''
      return -1;
    })()

    theItemHandler(defaultVal);
    setShowMenu(false);
    setHoldMenu(false);
  },[theItemHandler,menuItems, defaultValue])

  const itemDivs:JSX.Element[] = useMemo(()=>{
    const choices =  menuItems.map((item,i)=>(
      <div className={styles.item} key={`item_${menuTitle}_${i}`} onClick={()=>itemClickHandler(item)}>
        { capitalizeProperly(item) }
      </div>
    ))
    return choices
  },[ menuTitle, menuItems, itemClickHandler ]);

  if(!showOnlyWhen)return null;

  return (
    <div className={className} onClick={buttonClickHandler} ref={buttonRef}>
      <div className={styles.downLogo}>
        {showMenu?'∧':'v'}
      </div>
      {displayPlaceHolder()}
      {(showMenu&&items.length>0)?
      <ScrollableDiv 
        className={styles.menu} 
        scrollY={{trackBorder:`1px solid gray`}} 
        onMouseEnter={mouseInsideMenu}
        onMouseLeave={mouseOutsideMenu}
        >

        {!noDefault&&(<div key={`item_${menuTitle}_default`} className={styles.item} onClick={defaultClickHandler}>{defaultText}</div>)}
        {itemDivs}

      </ScrollableDiv>
      :
      null}
    </div>
  );
}

export default Menu