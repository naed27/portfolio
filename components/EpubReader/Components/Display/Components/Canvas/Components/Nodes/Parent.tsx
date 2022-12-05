import { memo } from "react";
import NodeChildren from "../Hooks/NodeChildren";
import LayoutRouter from "../Layouts/LayoutRouter";
import { HTMLElement as NodeElement } from "node-html-parser";

export interface Props {
  id: string
  node: NodeElement
}

const Parent = ( props: Props ) => {

  const { node } = props

  return (
    <LayoutRouter node={node} >
      <NodeChildren {...props}/>
    </LayoutRouter>
  )

}

export default memo(Parent)