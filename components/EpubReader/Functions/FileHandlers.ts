import { toBase64 } from "../../../utility/functions";

export const changeFile = async (e:any)=>{
  const file = e.target.files[0]
  if(!file || file.type !== 'application/epub+zip') return
  
  const fileData = await toBase64(file) as string;

}