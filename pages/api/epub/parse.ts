import EPub  from 'epub2'
import { IncomingForm } from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'
import { EpubChapter } from '../../../components/EpubReader/Functions/FileHandlers';
import Mime from 'mime'

export const config = { api: { bodyParser: false } };

const handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> => {

  const chapters: EpubChapter[] = [];

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

  const epub = await EPub.createAsync(newFile._writeStream.path);

  for await (const {title, id, } of epub.flow) {
    chapters.push({
      chapterTitle: title ? title : '', 
      rawText: await new Promise((resolve) => {
        id && epub.getChapter(id, async (err, text)=> {  text ? resolve(text) : resolve('') })
      }),
    })
  }

  res.status(200).json({ chapters });
};

export default handler;