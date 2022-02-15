import { useCallback } from "react";
import ScrollableDiv from "../../../../utility/CustomScrollDiv/ScrollableDiv";
import { YGOCard } from "../../Misc/globalTypes";
import styles from "../Styles/Details.module.scss";

export default function Details({card}:{card:YGOCard}){

  const showTypeRaceAttr = useCallback((card:YGOCard)=>{
    const {race,type,attribute} = card;
    if(type===undefined)return null
    return (
    <div>
      {`${race?`${race} / `:''}${type}${attribute?` / ${attribute.charAt(0).toUpperCase()+attribute.slice(1).toLowerCase()}`:''}`}
    </div>
    )
  },[])

  const showLevel = useCallback((card:YGOCard)=>{
    const {level} = card
    if(level===undefined)return null
    const levelStr = `LV: ${level}`;
    const starsStr = (()=>{
      if(level<=0)return '';
      return `[${Array(level).fill(`★`).join('')}]`
    })()
    return(<div>{`${levelStr} ${starsStr}`}</div>)
  },[])

  const showLinkValues = useCallback((card:YGOCard)=>{
    const {linkval, linkmarkers} = card
    if(linkval === undefined || linkmarkers === undefined)return null

    const arrows = linkmarkers.map((marker)=>{
      switch(marker){
        case 'Right': return '→'
        case 'Left': return '←'
        case 'Top': return '↑'
        case 'Top-Right': return '↗'
        case 'Top-Left': return '↖'
        case 'Bottom': return '↓'
        case 'Bottom-Right': return '↘'
        case 'Bottom-Left': return '↙'
        default: return
      }
    }).join(' ')

    return(<div>{`LINK: ${linkval} [ ${arrows} ]`}</div>)
  },[])

  const showScale = useCallback((card:YGOCard)=>{
    const {scale} = card
    if(scale===undefined)return null
    return(<div>{`SCALE: ${scale}`}</div>)
  },[])

  const showAtkDef = useCallback((card:YGOCard)=>{
    const {atk,def} = card;
    if(atk===undefined||def===undefined)return null
    return (<div>{`ATK : ${atk} / EF: ${def}`}</div>)
  },[])
  
  const showDesc = useCallback((card:YGOCard)=>{
    const {desc} = card;
    return `${desc}`;
  },[])

  return (
    <div className={styles.container}>
      <ScrollableDiv className={styles.desc} dependencies={[card]}>
        {showTypeRaceAttr(card)}
        {showLevel(card)}
        {showLinkValues(card)}
        {showScale(card)}
        {showAtkDef(card)}
        <br/>
        {showDesc(card)}
      </ScrollableDiv>
    </div>
  )
}