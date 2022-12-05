import { KeyValuePairs } from '../Types/Types';

export const getWordSizes = (paragraph: string) => {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d") as CanvasRenderingContext2D

  const words = paragraph.split(' ')
  const wordSizes = [];

  for(let i=0; i<words.length; i++)
    wordSizes.push({
      word: words[i],
      width: context.measureText(words[i]).width
    })

  canvas.remove();

  return wordSizes;
}

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

export const delay = async (milliseconds:number) => new Promise(res=>setTimeout(res, milliseconds))

export const createFileStorage = (resources:KeyValuePairs): FileStorage => {
  const result: FileStorage = {styles:{}, images:{}}
  const { assets, replacementUrls } = resources

  for (let i = 0; i < assets.length; i++) {
    const url = replacementUrls[i];
    const {href: longHref, type} = assets[i];
    const href: string = getExactFileName(longHref)
    switch(type){
      case 'text/css':  result.styles[href] = url; break;
      case 'image/jpeg':  result.images[href] = url; break;
      default: break;
    }
  }
  return result
}
