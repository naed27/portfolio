import axios, { AxiosResponse } from 'axios';
import Mime from 'mime'

export interface EpubChapter {
  chapterTitle: string;
  rawText: string;
}

export interface  ResponseData { 
  chapters: EpubChapter[] 
}

export const parseEpubfile = async (e:any) : Promise<ResponseData | void> =>{

  const axiosInstance = axios.create({ baseURL: window.location.origin })

  const file = e.target.files[0]
  const mime = Mime.getType(file.name)
  if(mime !== 'application/epub+zip') return

  const route = '/api/epub/parse'
  const config = { headers : { 'Content-Type': mime } }
  console.log('Getting Epub Texts...')

  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance
    .post<FormData, AxiosResponse<ResponseData>>(route, formData, config)
    .catch();

  if(!response || response.status !== 200) return

  return response.data
}