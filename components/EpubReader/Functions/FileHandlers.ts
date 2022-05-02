import axios, { AxiosResponse } from 'axios';
import Mime from 'mime'

export interface EpubItem {
  chapterTitle: string;
  rawText: string;
}

export interface  ResponseData { 
  data: EpubItem[] 
}

export const parseEpubfile = async (e:any) : Promise<EpubItem[]> =>{

  const axiosInstance = axios.create({ baseURL: window.location.origin })

  const file = e.target.files[0]
  const mime = Mime.getType(file.name)
  if(mime !== 'application/epub+zip') return []

  const route = '/api/epub/parse'
  const config = { headers : { 'Content-Type': mime } }
  console.log('Parsing Epub...')

  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<FormData, AxiosResponse<ResponseData>>(route, formData, config)
  .catch((error) => console.log(error));
  if(!response) return []
  if(response.status !== 200) return []
  console.log('Done Parsing Epub.')
  console.log(response)
  return response.data.data;
}