import { useCallback, useContext } from 'react'
import styles from './PageController.module.scss'
import { GlobalContext } from '../../Context/GlobalContext'

export default function PageController ({children}:any) {

  const {setCurrentPage, maxPage} = useContext(GlobalContext)

  const leftHandler = useCallback(()=>{
    setCurrentPage(current=>{
      if(current===0)
        return current
      return current-1
    })
  }, [setCurrentPage])

  const rightHandler = useCallback(()=>{
    setCurrentPage(current=>{
      if(current===maxPage)
        return current
      return current+1
    })
  }, [setCurrentPage, maxPage])

  return (
  <>
    <div className={styles.leftButton} onClick={leftHandler}/>
      {children}
    <div className={styles.rightButton} onClick={rightHandler}/>
  </>
  )
}