import styles from './Canvas.module.scss'
import { GlobalContext } from '../../../../Context/GlobalContext'
import { useContext, useEffect, useState } from 'react'
import { parse } from 'node-html-parser';

export default function Canvas() {

  const {canvasRef,epub} = useContext(GlobalContext)
  const [dangerousJSX,setDangerousJSX] = useState<JSX.Element>(<></>)

  useEffect(()=>{
    if(!canvasRef.current)return
    const chapters = epub.chapters;
    const images = epub.images;
    if(chapters.length===0)return
    const htmlString = epub.chapters.map(({html})=>html).join('')


    const html = parse(htmlString)
    html.querySelectorAll('img').map((img) => {
      const src = img.getAttribute('src') || '';
      img.setAttribute('src',`${images[`/${src}`]}`)
   });

   html.querySelectorAll('link').map((link)=>{
    const rel = link.getAttribute('rel') || '';
    if(rel==='stylesheet')
      link.setAttribute('href',`${images[`/${link.getAttribute('href')}`]}`)
   })

    const jsx = (()=>{
      if(chapters.length === 0)return <></>
      return <div dangerouslySetInnerHTML={{__html:html.toString()}}/>
    })()

    setDangerousJSX(jsx)

  },[epub,canvasRef])

  return(
    <div ref={canvasRef} className={styles.container}>
      {dangerousJSX}
    </div>
  )
}