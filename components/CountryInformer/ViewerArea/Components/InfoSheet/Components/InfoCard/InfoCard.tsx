import { useCallback, useState } from 'react';
import styles from './InfoCard.module.scss'
import ScrollableDiv from '../../../../../../../utility/CustomScrollDiv/ScrollableDiv';
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
    title: string,
    value: string | string []
};

const animation = {
  initial:{
    opacity:0
  },
  final:{
    opacity:1,
    transition:{
      duration:0.2
    }
  },
  exit:{
    opacity:0,
    transition:{
      duration:0.2
    }
  }
}

const InfoCard = ({title, value}: Props) => {

  const [showMenu,setShowMenu] = useState(false);
  const [refreshScroll, setRefreshScroll] = useState(false);

  const onClickHandler = useCallback(()=>{
    setShowMenu(current=>!current)
  },[])

  const refreshHandler = useCallback(()=>{
    setRefreshScroll(current=>!current)
  },[])

  if(typeof value === 'string')
    return (
      <div className={styles.container}>
        <div style={{color:'gold'}}>{`${title}: `}</div>
        <div>{`${value}`}</div>
      </div>
    )
  
  if(Array.isArray(value))
    return (
      <div className={styles.container}>
        <div  style={{color:'gold'}} className={styles.cell}>
          {`${title}: `}
        </div>
        <div
          className={styles.cell} 
          style={{maxHeight:showMenu?'100px':'20px', overflowY:showMenu?'scroll':'hidden'}}>
            <AnimatePresence>
              {!showMenu?
                <div>{`${value[0]}`}</div>
                :
                <ScrollableDiv 
                animationY={animation}
                dependencies={[refreshScroll]}
                className={styles.scrollContainer} 
                scrollY={{ thumbOpacity:1, thumbThickness:3 }}>
                  {value.map((value,index)=>{
                    if(index==0)
                      return (<div key={`${value}`}>{`${value}`}</div>)
                    return (<motion.div 
                      variants={animation}
                      initial='initial'
                      animate='final'
                      exit='exit'
                      key={`${value}`}>{`${value}`}</motion.div>)
                  })}
                </ScrollableDiv>
              }
            </AnimatePresence>
            
        </div>
        {value.length>1?<a onClick={onClickHandler} className={styles.dropDownButton}>{showMenu?`See less.`:`See more...`}</a>:null}
      </div>
    )
  
  return null
};

export default InfoCard;