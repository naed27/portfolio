import styles from './Block.module.scss'
import { useAnimate, usePresence, motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect, useMemo } from 'react'


interface Props {
  children?: ReactNode,
  slideOutDirection: 'RL' | 'LR'
};


const Block = ({children, slideOutDirection }: Props) => {

  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  const {leftGoal, rightGoal} = useMemo(()=>{
    return ({
      leftGoal: slideOutDirection == 'LR' ? '101%' : 'none',
      rightGoal: slideOutDirection == 'RL' ? '101%' : 'none',
    })
  },[slideOutDirection])

  useEffect(()=>{
    if(!isPresent){
      const exitAnimation = async () => {
        await animate(
          scope.current,
          {
            position: ['absolute', 'absolute'],
            top: ['0','0'],
            left: [leftGoal!='none'?'0%':'none', leftGoal],
            right: [rightGoal!='none'?'0%':'none', rightGoal],
         
          },
          {duration: 0.7}
        )
        safeToRemove()
      }
      exitAnimation()
    }
  })

  return (
    <div ref={scope} className={styles.container} >
      {children}
    </div>
  )
};

export default Block;