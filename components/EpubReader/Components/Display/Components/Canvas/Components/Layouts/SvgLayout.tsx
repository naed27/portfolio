import { EpubJSXAttributes } from "../../../../../../Types/Types";
import { memo } from 'react';

interface Props {
  children?: any
  attributes: EpubJSXAttributes,
}

function SvgLayout ({ attributes, children }: Props) {


  return (
    <svg {...attributes}>
      {children}
    </svg>
  )
  
}

export default memo(SvgLayout)