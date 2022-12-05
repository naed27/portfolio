import { KeyValuePairs } from '../../../../../Types/Types';
import { HTMLElement as NodeElement } from 'node-html-parser';
import { getExactFileName } from '../../../../../Functions/Functions';

export interface Props {
  node: NodeElement, 
  images: KeyValuePairs, 
}

export const correctNode = ({node, images}: Props) => {

  const { childNodes } = node

  for (let i = 0; i < childNodes.length; i++) {
    const child = childNodes[i] as NodeElement;

    if( child.rawTagName === 'head'){
      child.remove()
      continue
    }

    if(
      child.rawTagName === 'a' ||
      child.rawTagName === 'p' ||
      child.rawTagName === 'span'
    ){
      child.setAttribute('style','font-size:14px; color:black')
    }

    if(child.childNodes.length>0){
      correctNode({node: child, images})
      continue
    }

    if(child.rawTagName === 'image'){
      const url = child.getAttribute('xlink:href')||''
      const image = images[getExactFileName(url)]
      if(image!==undefined){
        child.setAttribute('xlink:href',image)
      }
    }

    if(child.rawTagName === 'img'){
      child.removeAttribute('class')
      const url = child.getAttribute('src')||''
      const image = images[getExactFileName(url)]
      if(image!==undefined){
        child.setAttribute('src',image) 
      }
    }

  }

  return node.toString()

}

export const preloadImages = (images: KeyValuePairs) => {
  const result = []
  for(let key in images) {
    const img = new Image();
    img.src = images[key];
    result.push(img)
  }
  return result
}