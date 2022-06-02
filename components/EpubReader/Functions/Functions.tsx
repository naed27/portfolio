import { EpubChapter } from '../../../pages/api/epub/parse';
import { KeyValuePairs } from '../Context/GlobalContext';

export const getExactFileName = (fileAddress: string) =>{
  const fileName = fileAddress.split('/').pop()
  if(fileName)
    return fileName
  return ''
}

export type EpubFileType = 'image/jpeg' | 'text/css'

export interface FileStorage {
  styles: {[key: string]: string },
  images: {[key: string]:  string },
}

export const createFileStorage = (resources:KeyValuePairs): FileStorage => {
  const result: FileStorage = {styles:{}, images:{}}
  const rawAssets = resources.assets;
  const replacementUrls = resources.replacementUrls;
  for (let i = 0; i < rawAssets.length; i++) {
    const url = replacementUrls[i];
    const {href: longHref, type}:{ href: string, type: EpubFileType} = rawAssets[i];
    const href: string = getExactFileName(longHref)
    switch(type){
      case 'text/css':  result.styles[href] = url; break;
      case 'image/jpeg':  result.images[href] = url; break;
      default: break;
    }
  }
  return result
}

export const createStyleElements = (styles: {[key: string]: string }) => {
  const stylesArray: JSX.Element[] = [];

  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key)) {
      const element = styles[key];
      stylesArray.push(<link key={`stylesheet_${key}`} href={element}/>) 
    }
  }

  return stylesArray
}
