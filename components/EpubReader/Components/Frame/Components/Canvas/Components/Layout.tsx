import { HTMLElement } from "node-html-parser";
import { GlobalContext  } from "../../../../../Context/GlobalContext";
import { useContext } from "react";

export function Layout({node, children}:{node: HTMLElement, children?: any}) {

  const {canvasSize} = useContext(GlobalContext)
  const {height: maxHeight, width: maxWidth} = canvasSize;

  const TagName = node.rawTagName as keyof JSX.IntrinsicElements | undefined | null

  const {rawAttributes} = node

  if(TagName === undefined || TagName === null || rawAttributes === undefined || rawAttributes === null)
    return (<>{children}</>)
  
  if(TagName === 'br' || TagName === 'hr')
    return <TagName/>
    
  const attributes = {
    width: node.rawAttributes.width,
    xmlns: node.rawAttributes.xmlns,
    height: node.rawAttributes.height,
    viewBox: node.rawAttributes.viewBox,
    className: node.rawAttributes.class,
    xmlnsXlink: node.rawAttributes.xmlnsXlink,
    preserveAspectRatio: node.rawAttributes.preserveAspectRatio,
  }

  if(TagName === 'svg')
    return <svg {...attributes} style={{ maxWidth, maxHeight, width:'auto' }}>{children}</svg>

  if(TagName === 'table')
    return <table {...attributes}> <tbody>{children&&children}</tbody> </table>
  
  return (<TagName {...attributes}>{children&&children}</TagName>)
}