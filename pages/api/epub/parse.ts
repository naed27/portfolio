import EPub  from 'epub2'
import { IncomingForm } from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import { EpubItem } from '../../../components/EpubReader/Functions/FileHandlers';

export const config = { api: { bodyParser: false } };

const handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> => {

  const chapters: EpubItem[] = [];

  if(!req) res.status(200).json({ data: chapters });

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  }) as {fields: { [key: string]: any }, files: { [key: string]: any }}

  const file = data.files.file._writeStream.path
  const epub = await EPub.createAsync(file);

  for await (const {title, id} of epub.toc) {
    const chapterTitle = title ? title : ''

    const rawText = await new Promise((resolve, reject) => {
      id && epub.getChapter(id, async (err, text)=> {  text? resolve(text): resolve('') })
    }) as string

    chapters.push({chapterTitle, rawText})
  }
  
  res.status(200).json({ data: chapters });

};

export default handler;