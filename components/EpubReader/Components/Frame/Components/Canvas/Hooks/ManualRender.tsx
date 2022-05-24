import { parse } from 'node-html-parser';
import { useEffect, useState, useContext } from "react"
import { GlobalContext } from '../../../../../Context/GlobalContext'
import { getExactFileName } from '../../../../../Functions/Utility';

export default function useManualRender () {
  const {epub, setParsingStatus} = useContext(GlobalContext)
  const [dangerousJSX,setDangerousJSX] = useState<JSX.Element>(<></>)

  useEffect(()=>{
    const {chapters, files, fileKeys} = epub
    if(chapters.length===0) 
      return setParsingStatus(false)

    const htmlString = epub.chapters.map(({rawText})=>rawText).join('')

    const html = parse(htmlString)

    const imgElements = html.querySelectorAll('img')
    imgElements.map((img) => {
      const src = img.getAttribute('src') || '';
      const exactFileName = getExactFileName(src);
      const fileKey = fileKeys[exactFileName]
      img.setAttribute('src',`${files[fileKey]}`)
    });

    const imageElements = html.querySelectorAll('image')
    imageElements.map((img) => {
      const src = img.getAttribute('xlink:href') || '';
      const exactFileName = getExactFileName(src);
      const fileKey = fileKeys[exactFileName]
      img.setAttribute('xlink:href',`${files[fileKey]}`)
    });

    html.querySelectorAll('link').map((link)=>{
      const rel = link.getAttribute('rel') || '';
      if(rel==='stylesheet')
        link.setAttribute('href',`${files[`/${link.getAttribute('href')}`]}`)
    })

    const jsx = (()=>{
      if(chapters.length === 0)return <></>
      return <div dangerouslySetInnerHTML={{__html:html.toString()}}/>
    })()

    setDangerousJSX(jsx)
    setParsingStatus(false)

  },[epub, setParsingStatus])

  return {dangerousJSX}
}