import styles from './PreviewBox.module.scss'
import { useAnimate, usePresence } from 'framer-motion'
import { ReactNode, useEffect, useMemo } from 'react'

interface Props {
  src?: string,
  text?: string,
  afterAnimation?: () => void
};

const PreviewBox = ({src = '', text = '', afterAnimation = ()=>{}}: Props) => {

  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(()=>{
    if(isPresent){
      const enterAnimation = async () => {
        await animate(
          scope.current,
          {
            opacity: [0,1]
          },
          {duration: 0.5}
        )
        afterAnimation()
      }
      enterAnimation()
    }else{
      const exitAnimation = async () => {
        await animate(
          scope.current,
          {
            opacity: [1,0]
          },
          {duration: 0.3}
        )
      }
      exitAnimation()
    }
  })

  return (
    <div ref={scope} className={styles.container}>
      {(src.length > 0) ? <img 
        src={`${src}`}  
        alt={`preview image`} 
        style={{
          width: `100%`,
          height:'100%',
          objectFit: 'cover',
        }}
        />:<>{text}</>}
      {(src.length > 0) && <div className={styles.cover}/>}
    </div>
  )
};

export default PreviewBox;