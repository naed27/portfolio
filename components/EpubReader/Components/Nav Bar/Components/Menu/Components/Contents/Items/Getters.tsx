import epub, { Book } from 'epubjs'
import { parse } from 'node-html-parser';
import { KeyValuePairs } from '../../../../../../../Types/Types';
import { getExactFileName } from '../../../../../../../Functions/Functions';
import { correctNode } from '../../../../../../Display/Components/Canvas/Helpers/Helpers';


export const extractEpubLocally = async (file: any) => {
  const book = epub(file);

  const rawSections = await getEpubSections(book)
  const {images, styles} = await getEpubResources(book)
  const sections = cleanEpubHTML(rawSections, images)

  return {sections, images, styles}
}

//------------------- Sub-Functions

const getEpubSections = async (book: Book) => {
  const { spineItems }  = await book.loaded.spine as KeyValuePairs
  const result = []
  for(let i=0; i<spineItems.length; i++){
    const {url, idref} = spineItems[i]
    const htmlString = await book.archive.getText(url) 
    result.push({ id: idref as string, htmlString })
  }
  return result
}

const getEpubResources = async (book: Book) => {
  const resources = await book.loaded.resources as KeyValuePairs
  const result = {styles:{} as KeyValuePairs, images:{} as KeyValuePairs}
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

const cleanEpubHTML = (sections: { id: string, htmlString: string }[], images: KeyValuePairs) => {
  for (let i = 0; i < sections.length; i++) {
    const node = parse(sections[i].htmlString)
    const parsedNode = correctNode({node, images})
    sections[i].htmlString = parsedNode
  }
  return sections
}