import { HTMLElement } from "node-html-parser";
import { getAttributes } from "../../Functions/Functions";

interface Props {
  node: HTMLElement, 
}

function EpubImage ({ node } : Props) {

  const tagName = node.rawTagName as 'image' | 'img'

  const url = node.getAttribute('src') || node.getAttribute('xlink:href') || ''
  const attributes = getAttributes(node)

  if(tagName==='image')
    return ( <image xlinkHref={url} {...attributes}/> )
  
  return ( <img {...attributes} /> )
}

export default EpubImage
