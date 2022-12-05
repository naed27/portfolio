import Parent from "./Nodes/Parent";
import { memo } from "react";
import Childless from "./Nodes/Childless";
import { isHeader, isXmlRoot } from "./Functions/Functions";
import { HTMLElement as NodeElement } from "node-html-parser";

export interface Props {
  id: string
  node: NodeElement
}

const Node = (props: Props) => {

  const { node, node:{childNodes} } = props
  
  if(isXmlRoot(node) || isHeader(node))
    return <></>
    
  if(childNodes.length>0)
    return <Parent {...props}/>

  if(childNodes.length==0)
    return <Childless {...props}/>

  return <></>
}

export default memo(Node)
