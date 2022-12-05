import { memo } from "react";
import DivLayout from "./DivLayout";
import SvgLayout from "./SvgLayout";
import VoidLayout from "./VoidLayout";
import TableLayout from "./TableLayout";
import { getAttributes } from "../Functions/Functions";
import { EpubNodeElement } from "../../../../../../Types/Types";

export interface Props {
  children?: any,
  node: EpubNodeElement,
}

const LayoutRouter = ({node, children}: Props) => {

  const TagName = node.rawTagName as keyof JSX.IntrinsicElements | undefined | null

  const attributes = getAttributes(node)

  if(TagName === undefined || TagName === null)
    return <VoidLayout>{children}</VoidLayout>

  if(TagName === 'div' || TagName === 'html' || TagName === 'body')
    return <DivLayout attributes={attributes}>{children}</DivLayout>

  if(TagName === 'svg')
    return <SvgLayout attributes={attributes}>{children}</SvgLayout>

  if(TagName === 'table')
    return <TableLayout attributes={attributes}>{children}</TableLayout>
      
  return <TagName {...attributes}>{children}</TagName>

}

export default memo(LayoutRouter)
