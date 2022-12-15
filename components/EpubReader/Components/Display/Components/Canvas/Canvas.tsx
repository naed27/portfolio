import styles from './Canvas.module.scss'
import DangerousHtml from './Content Manager/DangerousHtml'
import { memo, useContext, useEffect, useMemo } from 'react'
import { GlobalContext } from '../../../../Context/GlobalContext'
import { EpubStyleJSX } from './Components/EpubStyleJSX/EpubStyleJSX'
import FinalPrint from './Content Manager/FinalPrint'
import HiddenSizer from './Content Manager/HiddenSizer'

const Canvas = () => {

  const {
    epub,
    pages,
    canvasRef,
    canvasSize,
    setPages,
    setCurrentPage, 
  } = useContext(GlobalContext)

  const epubData = useMemo(()=> epub, [ epub ])

  useEffect(()=>{

    setPages([])
    setCurrentPage(0)

  },[ 
    epubData,
    setPages,
    setCurrentPage,
  ])

  return(
    <div 
      ref={canvasRef} 
      style={canvasSize}
      className={styles.container}>
      <EpubStyleJSX styles={epubData.styles}/>
      {/* {(pages.length===0) && <DangerousHtml epubData={epubData}/>} */}

      {(pages.length===0)?
        <DangerousHtml epubData={epubData}/>
      :
        <FinalPrint pages={pages}/>
      }
      
      <HiddenSizer/>

    </div>
  )
}

export default memo(Canvas)