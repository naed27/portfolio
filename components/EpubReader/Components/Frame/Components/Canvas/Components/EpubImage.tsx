import { HTMLElement } from "node-html-parser";
import { getExactFileName } from "../../../../../Functions/Functions";
import { GlobalContext, KeyValuePairs } from "../../../../../Context/GlobalContext";
import { useContext } from "react";

export interface Props{
  node: HTMLElement,
  images: KeyValuePairs
}

export default function EpubImage ({ node, images } : Props) {

  const tagName = node.rawTagName as 'image' | 'img'
  const {canvasSize} = useContext(GlobalContext)
  const {height: canvasHeight, width: canvasWidth} = canvasSize
  const src = node.getAttribute('src') || node.getAttribute('xlink:href') || ''
  const exactFileName = getExactFileName(src);
  const url = images[exactFileName]

  if(tagName==='image')
    return (
      <image  xlinkHref={url}
      style={{
        maxWidth:`${canvasWidth}px`,
        maxHeight:`${canvasHeight}px`,
        width: `auto`,
        height: `100%`
      }}
    />
    )
  
  return (
    <img 
      src={url} 
      alt={'epub image'} 
      style={{
        maxWidth:`${canvasWidth}px`,
        maxHeight:`${canvasHeight}px`,
      }}
    />
    )
}
