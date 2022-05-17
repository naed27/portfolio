import Mime from 'mime'
import epub from 'epubjs'
import {clone} from 'lodash'
import axios, { AxiosResponse } from 'axios';

export interface EpubChapter{
  html: string,
  idref: string,
  index: string,
  canonical: string,
  cfiBase: string
}

export interface EpubImages{
  [key: string]: string
}

export const getEpubFiles = async (file: any) => {
  const book = epub(file)
  const archive = book.archive as {[key: string]: any}
  const images = archive.urlCache as EpubImages
  const spine = await book.loaded.spine as {[key: string]: any}

  console.log(images)

  const chapters:EpubChapter[] = []
  for await (const item of spine.spineItems) {
    const {idref, index, canonical, cfiBase} = item
    const contents = await item.load(book.load.bind(book))
    chapters.push({
      html:contents.innerHTML,
      idref: idref as string, 
      index: index as string, 
      canonical: canonical as string, 
      cfiBase: cfiBase as string
    })
  }

  return { chapters, images }
}

export interface EpubChapter2 {
  chapterTitle: string;
  rawText: string;
}

export interface  ResponseData { 
  chapters: EpubChapter2[] 
}

export const getEpubTexts = async (file:any) : Promise<{chapters:EpubChapter2[]}> =>{

  const DEFAULT_RETURN_DATA: ResponseData = {chapters:[]}

  const axiosInstance = axios.create({ baseURL: window.location.origin })

  const mime = Mime.getType(file.name)
  if(mime !== 'application/epub+zip') 
    return DEFAULT_RETURN_DATA

  const route = '/api/epub/parse'
  const config = { headers : { 'Content-Type': mime } }

  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance
    .post<FormData, AxiosResponse<ResponseData>>(route, formData, config)
    .catch();

  if(!response || response.status !== 200) 
    return DEFAULT_RETURN_DATA

  return {chapters: response.data.chapters}
}
