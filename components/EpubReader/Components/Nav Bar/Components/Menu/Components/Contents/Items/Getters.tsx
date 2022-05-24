import Mime from 'mime'
import epub from 'epubjs'
import axios, { AxiosResponse } from 'axios';
import { EpubChapter, WebRoots } from '../../../../../../../../../pages/api/epub/parse';
import { generateFileKeys } from '../../../../../../../Functions/Utility';

export const renderEpub = async ({file, id}:{file:any, id:string}) => {
  const book = epub(file)
  book.renderTo(id)
}

export const getEpubFiles = async (file: any) => {
  const book = epub(file)
  const resources = await book.loaded.resources as any
  const assets = await resources.urls as string[]
  const archive = book.archive as {[key: string]: any}
  const files = await archive.urlCache as {[key: string]: any}
  const fileKeys = generateFileKeys( assets )

  const {chapters, webRoots} = await getEpubTexts(file)
  return { chapters, files, webRoots, fileKeys }
}

interface APIResponse {
  chapters: EpubChapter[],
  webRoots: WebRoots
}

export const getEpubTexts = async (file:any) : Promise<APIResponse> =>{

  const DEFAULT_RETURN_DATA: APIResponse = {
    chapters: [],
    webRoots: {
      chapter: '/chapters/',
      image: '/images/',
    }
  }

  const axiosInstance = axios.create({ baseURL: window.location.origin })

  const mime = Mime.getType(file.name)
  if(mime !== 'application/epub+zip') 
    return DEFAULT_RETURN_DATA

  const route = '/api/epub/parse'
  const config = { headers : { 'Content-Type': mime } }

  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance
    .post<FormData, AxiosResponse<APIResponse>>(route, formData, config)
    .catch();

  if(!response || response.status !== 200) 
    return DEFAULT_RETURN_DATA

  return response.data
}
