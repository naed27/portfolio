import { memo } from "react";
import {  EpubJSXAttributes } from "../../../../../../Types/Types";

interface Props {
  children?: any
  attributes: EpubJSXAttributes,
}

const TableLayout = ({ attributes, children }: Props) => {

  return <table {...attributes}>{children&&children}</table>
}

export default memo(TableLayout)