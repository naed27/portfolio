import axios, { AxiosResponse } from 'axios';

export interface EpubItem {
  chapterTitle: string;
  rawText: string;
}

export interface  ResponseData { 
  data: EpubItem[] 
}

export const parseEpubfile = async (e:any) : Promise<EpubItem[]> =>{

  const axiosInstance = axios.create({
    baseURL: window.location.origin
  })

  const file = e.target.files[0]
  if(!file || file.type !== 'application/epub+zip') return []

  const route = '/api/epub/parse'
  const config = { headers : { 'Content-Type': 'multipart/form-data' } }

  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<FormData, AxiosResponse<ResponseData>>(route, formData, config)
  .catch((error) => console.log(error));
  if(!response) return []
  if(response.status !== 200) return []

  return response.data.data;
}