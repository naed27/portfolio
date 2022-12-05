import Node from "../Node";
import { HTMLElement as NodeElement } from "node-html-parser";
import { memo } from "react";

export interface Props {
  id: string
  node: NodeElement
}

const NodeChildren = ( props: Props ) => {

  const { node, id } = props;

  return (
    <>
      {node.childNodes.map((child, i)=>{
        return (
          <Node 
            key={`${id}_${i}`} 
            id={`${id}_${i}`}  
            node={child as NodeElement}
          />
        )
      })}
    </>
  )
}

export default memo(NodeChildren)

