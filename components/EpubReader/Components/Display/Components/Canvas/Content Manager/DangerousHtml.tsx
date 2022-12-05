import { Paginate } from "./Helpers/Paginate";
import ScaleImages from "./Helpers/ScaleImages";
import { preloadImages } from "../Helpers/Helpers";
import { EpubObject } from "../../../../../Types/Types";
import { memo, useContext, useEffect, useMemo, useRef  } from "react";
import { GlobalContext } from "../../../../../Context/GlobalContext";

interface Props {
  epubData: EpubObject
}

const DangerousHtml = ({epubData:{sections,images}}: Props) => {
  
  const ref = useRef<HTMLDivElement>(null);
  const { sizerRef, canvasRef, canvasSize, setPages, setMaxPage } = useContext(GlobalContext);
  const htmlImages = useMemo(()=>preloadImages(images), [images])

  useEffect(()=>{
    const guardCondition = (ref.current===null || canvasRef.current === null || sizerRef.current === null)
    if(guardCondition) return

    const sizer = sizerRef.current
    const canvas = canvasRef.current
    const focusedElement = ref.current

    Promise.all(

      Array.from(htmlImages)
        .filter(img => !img.complete)
        .map(img => new Promise(
          resolve => { img.onload = img.onerror = resolve; }

    ))).then(() => {

      if(guardCondition) return

      ScaleImages({ canvas, focusedElement })

      const pages = Paginate({ sizer, canvas, focusedElement })
      // setPages(pages)
      // setMaxPage(pages.length-1)
      
    });

  },[sizerRef, canvasRef, canvasSize, htmlImages, setPages, setMaxPage])

  return (
    <div ref={ref}>
      {(sections.length>0) ? (() => {
        const result = []
        for (let i = 0; i < sections.length; i++) {
          result.push(
            <div 
              id ={`section_${i+1}`} 
              key = {`section_${i+1}`} 
              dangerouslySetInnerHTML={{__html: sections[i].htmlString}}
            /> 
          ) 
        }
        return result
      })() : null }
    </div>
  )
}

export default memo(DangerousHtml)