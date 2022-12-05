import { useMemo } from "react";
import { KeyValuePairs } from "../../../../../../Types/Types"


export interface Props {
  styles: KeyValuePairs
}

export const EpubStyleJSX = ({ styles }: Props) => {

  const epubStyles = useMemo(()=> {
    const stylesArray: JSX.Element[] = [];
    for (const key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        const element = styles[key];
        stylesArray.push(<link key={`stylesheet_${key}`} href={element} rel="stylesheet" type='text/css'/>) 
      }
    }
    return stylesArray
  },[ styles ])

  return (<>{epubStyles.map(( jsx ) => jsx )}</>)

} 