import { NextApiRequest, NextApiResponse } from 'next'
// import {stat} from "fs/promises"
import {createReadStream, existsSync} from "fs-extra"
import path from "path"
import mime from 'mime';


//basic nextjs api 
export default async function getFile (req:NextApiRequest, res:NextApiResponse) {

    // // write authentication below

    // // get the absolute file path
    // const someFilePath = path.resolve('./private/empty_crown.mp3');

    // // existsSync = check if a file exists or not
    // // if file is not located in specified folder then stop and end with 404
    // if (! existsSync(someFilePath)) return res.status(404);

    // // Create read stream from path and now its ready to serve to client
    // // Read the file as chunks
    // const file = createReadStream(someFilePath);
    
    // // set cache so its proper cached. not necessary
    // // 'private' part means that it should be cached by an invidual(= is intended for single user) and not by single cache. More about in https://stackoverflow.com/questions/12908766/what-is-cache-control-private#answer-49637255
    // res.setHeader('Cache-Control', `private, max-age=5000`);
    
    // // set mime type. in case a browser cant really determine what file its gettin
    // // you can get mime type by lot if varieties of methods but this working so yay
    // const mimetype = mime.getType(someFilePath);
    // res.setHeader('Content-type', mimetype);

    // // Pipe it to the client - with "res" that has been given
    // // Pipe = combine all the file chunks into one
    // file.pipe(res);

    

    
}