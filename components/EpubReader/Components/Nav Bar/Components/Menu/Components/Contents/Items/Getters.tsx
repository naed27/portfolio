import Mime from 'mime'
import epub from 'epubjs'
import {clone} from 'lodash'
import axios, { AxiosResponse } from 'axios';

export const getEpubFiles = (file: any) => {
  const book = epub(file)
  const archive = clone(book.archive) as {[key: string]: any}
  const images = archive.urlCache as {[key: string]: any}
  return { images }
}

export interface EpubChapter {
  chapterTitle: string;
  rawText: string;
}

export interface  ResponseData { 
  chapters: EpubChapter[] 
}

export const getEpubTexts = async (file:any) : Promise<{chapters:EpubChapter[]}> =>{

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
