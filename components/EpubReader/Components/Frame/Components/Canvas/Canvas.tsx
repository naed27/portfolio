import { useContext, useMemo, useEffect } from 'react'
import { GlobalContext } from '../../../../Context/GlobalContext'
import styles from './Canvas.module.scss'
import PrepareContent from './Content Manager/PrepareContent'

export default function Canvas() {

  const {canvasSize, canvasRef, currentPage} = useContext(GlobalContext)

  const {chaptersJSX, styleElements} = PrepareContent()

  const canvasStyle = useMemo(()=>({
    width:`${canvasSize.width}px`,
    height:`${canvasSize.height}px`
  }),[canvasSize])

  useEffect(()=>{
    if(canvasRef.current===null) return
    canvasRef.current.scrollTop = 0
    canvasRef.current.scrollLeft = 0
  },[currentPage, canvasRef])

  return(
    <> 
      <div ref={canvasRef} 
      className={styles.container} 
      style={canvasStyle}
      >
        {styleElements.map((link)=>link)}
        {(()=>{
          if (chaptersJSX.length>0)
            return chaptersJSX[currentPage]
          return null
        })()}
      </div>
    </>
  )
}