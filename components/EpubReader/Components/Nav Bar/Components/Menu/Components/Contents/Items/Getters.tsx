import Mime from 'mime'
import epub from 'epubjs'
import axios, { AxiosResponse } from 'axios';
import { ExtractEpubTextResponse } from '../../../../../../../../../pages/api/epub/parse';

export const renderEpub = async ({file, id}:{file:any, id:string}) => {
  const book = epub(file)
  book.renderTo(id)
}

export const getEpubFiles = async (file: any) => {
  const book = epub(file)
  const resources = await book.loaded.resources
  const { chapters } = await requestEpubTexts(file)
  return { chapters, resources }
}


export const requestEpubTexts = async (file:any) : Promise<ExtractEpubTextResponse> =>{

  const DEFAULT_RETURN_DATA: ExtractEpubTextResponse = {
    chapters:[],
    webRoots:{ chapter:'', image:'' }
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
    .post<FormData, AxiosResponse<ExtractEpubTextResponse>>(route, formData, config)
    .catch();

  if(!response || response.status !== 200) 
    return DEFAULT_RETURN_DATA

  return response.data
}
