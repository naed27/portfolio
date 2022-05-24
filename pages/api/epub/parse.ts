import EPub  from 'epub2'
import { IncomingForm } from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import Mime from 'mime'

export interface EpubChapter {
  id: string,
  href: string,
  title: string,
  order: number,
  level: number,
  rawText: string,
  mediaType: string,
}

export interface WebRoots {
  chapter: string,
  image: string,
}

export const config = { api: { bodyParser: false } };

const handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> => {

  const chapters: EpubChapter[] = [];
  const imageWebRoot = '/images/'
  const chapterWebroot = '/chapters/'
  const webRoots: WebRoots = {chapter: chapterWebroot, image: imageWebRoot}

  if(!req) res.status(200).json({ data: chapters });

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  }) as {fields: { [key: string]: any }, files: { [key: string]: any }}

  const mimetype = Mime.getType(data.files.file.originalFilename)
  const newFile = {...data.files.file, mimetype}

  const epub = await EPub.createAsync(newFile._writeStream.path,imageWebRoot,chapterWebroot);

  for await (const item of epub.flow) {
    
    const id = item.id || ''
    const href  = item.href || '';
    const title = item.title || '';
    const order = item.order || 0;
    const level = item.level || -1;
    const mediaType = item.mediaType || '';

    const rawText = await new Promise((resolve) => {
      id && epub.getChapter(id, async (err, text)=> {  text ? resolve(text) : resolve('') })
    }) as string


    chapters.push({
      id,
      href,
      order,
      level,
      title, 
      rawText,
      mediaType,
    })
  }

  res.status(200).json({ chapters, webRoots });
};

export default handler;