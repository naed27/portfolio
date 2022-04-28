import axios from 'axios';

export interface EpubItem {
  chapterTitle: string;
  rawText: string;
}

export const parseEpubfile = async (e:any) : Promise<EpubItem[]> =>{
  const file = e.target.files[0]
  if(!file || file.type !== 'application/epub+zip') return []
  

  const route = '/api/epub/parse'
  const config = { headers : { 'Content-Type': 'application/json' } }

  const formData = new FormData();
  formData.append('file', file);

  const response: {data:{data:EpubItem[]}} = await axios.post(route, formData, config)

  console.log(response)
  
  const epub = response.data.data;

  return epub;
}