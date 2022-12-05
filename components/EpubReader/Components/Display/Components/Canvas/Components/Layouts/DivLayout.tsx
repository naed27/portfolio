import { memo } from "react";
import { EpubJSXAttributes } from "../../../../../../Types/Types";

interface Props {
  children?: any
  attributes: EpubJSXAttributes,
}

function DivLayout ({ attributes, children }: Props) {

  return <div {...attributes} >{children}</div>
}

export default memo(DivLayout)