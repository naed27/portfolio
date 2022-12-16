import EpubImage from "./Components/EpubImage";
import { HTMLElement as NodeElement } from "node-html-parser";
import { getAttributes, hasNullText } from "../Functions/Functions";
import { memo } from "react";

export interface Props {
  id: string
  node: NodeElement
}

const  Childless = (props: Props) => {

  const { node } = props

  const TagName = node.rawTagName as keyof JSX.IntrinsicElements | undefined | null

  const rawText = node.rawText || null
  const attributes = getAttributes(node)

  if(TagName === 'image' || TagName === 'img')
    return <EpubImage node={ node }/>

  if(TagName === undefined || TagName === null){
    if(hasNullText(rawText))
      return <></>
    return <>{rawText}</>
  }

  if(hasNullText(rawText))
    return <TagName  {...attributes}/>

  if(TagName === 'p' || TagName === 'td')
    return <TagName {...attributes}>{rawText}</TagName>

  return <TagName {...attributes}/>
}

export default memo(Childless)