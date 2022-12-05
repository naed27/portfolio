import { createRef, RefObject } from "react"
import { EpubNodeElement, AdvancedEpubNode, EpubJSXAttributes, KeyValuePairs } from "../../../../../../Types/Types"

export const generateRefs = (length: number) : RefObject<null>[] => {
  return Array.from({length}, ()=>createRef<null>())
}

export const generateAdvancedNode = (node: EpubNodeElement): AdvancedEpubNode => {

  const children = node.childNodes
  const childrenRefTree: AdvancedEpubNode[] = []
  const selfRef: RefObject<null> = createRef<null>()

  for ( let i = 0; i < children.length; i++ ) {
    const childRefTree = generateAdvancedNode( children[i] as EpubNodeElement )
    childrenRefTree.push( childRefTree )
  }

  return {node, selfRef, childrenRefTree}
}

export const isXmlRoot = (node: EpubNodeElement) => {
  const rawText = node.rawText.replace(/\s/g, '').substring(0,5);
  if(rawText==="<?xml" && node.childNodes.length===0)
    return true
  return false
}

export const isHeader = (node: EpubNodeElement) => {
  const tagName = node.rawTagName
  if(tagName===`head`)
    return true
  return false
}

export const isWhiteSpaceText = (rawText: string) => {
  const text = rawText.replace(/\s/g, '')
  if(text==='')
    return true
  return false
}

export const hasNullText = (rawText: string | null | undefined) => {
  if(
    rawText === null ||
    rawText === undefined
  ) return true
  return false
}

export const getAttributes = (node: EpubNodeElement) : EpubJSXAttributes => {
  const { rawAttributes } = node
  if(rawAttributes)
    return {
      src: node.rawAttributes.src,
      width: node.rawAttributes.width,
      xmlns: node.rawAttributes.xmlns,
      height: node.rawAttributes.height,
      viewBox: node.rawAttributes.viewBox,
      className: node.rawAttributes.class,
      xmlnsXlink: node.rawAttributes.xmlnsXlink,
      style: cssStringToObj(node.rawAttributes.style),
      preserveAspectRatio: node.rawAttributes.preserveAspectRatio,
    }
  return {}
}


export const cssStringToObj = (cssText?: string) => {

  if(!cssText || cssText === '') return 

  let match
  const properties: KeyValuePairs = {};
  const regex = /([\w-]*)\s*:\s*([^;]*)/g;

  while(match=regex.exec(cssText)) 
    properties[match[1]] = match[2].trim();

  const result:KeyValuePairs = {}

  for(let key in properties) {
    let value = properties[key];
    const camelCaseKey = key.split('-')
    .map(( word,i ) =>(i>0) ? word.charAt(0).toUpperCase()+word.substring(1): word)
    .join('');
    result[camelCaseKey] = value
  }

  return result
  
}