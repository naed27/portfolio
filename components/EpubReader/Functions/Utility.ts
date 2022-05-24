import util from 'util';

export const getExactFileName = (fileAddress: string) =>{
  const fileName = fileAddress.split('/').pop()
  if(fileName)
    return fileName
  return ''
}

export const generateFileKeys = (assets:string[]) => {
  const result:{[key:string]: string} = {}

  for (let i = 0; i < assets.length; i++) {
    const key = getExactFileName(assets[i])
    const urlKey = `/${assets[i]}`
    result[key] = urlKey
  }

  return result
}