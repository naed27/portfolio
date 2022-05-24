import { createContext, Dispatch, SetStateAction, RefObject } from 'react';
import { EpubChapter, WebRoots } from '../../../pages/api/epub/parse';

export interface BookInfoType {
  title: string | null, author: string | null
}

export interface ReadInfoType {
  chapter: number | null, page: number | null
}

export interface EpubObject {
  webRoots: WebRoots,
  chapters: EpubChapter[], 
  files: {[key:string]: string},
  fileKeys: {[key:string]: string}
}

export interface GlobalContextType {

  epub: EpubObject,
  setEpub: Dispatch<SetStateAction<EpubObject>>,

  canvasRef: RefObject<HTMLDivElement>,
  readingProgressBar: RefObject<HTMLDivElement>,

  canvasSize: {width: number, height: number},
  setCanvasSize: Dispatch<SetStateAction<{width: number, height: number}>>,

  parsingStatus: boolean, 
  setParsingStatus: Dispatch<SetStateAction<boolean>>,

  bookInfo: BookInfoType | null,
  readInfo: ReadInfoType | null,

  setBookInfo: Dispatch<SetStateAction<BookInfoType | null>>,
  setReadInfo: Dispatch<SetStateAction<ReadInfoType | null>>,

  showChapters: boolean, 
  showBookInfo: boolean, 
  showSettings: boolean,
  showFileManager: boolean,
  showMenuContents: boolean, 
  showNavBarContents: boolean,
  
  toggleChapters: Dispatch<SetStateAction<boolean>>,
  toggleBookInfo: Dispatch<SetStateAction<boolean>>,
  toggleSettings: Dispatch<SetStateAction<boolean>>,
  toggleFileManager: Dispatch<SetStateAction<boolean>>,
  toggleMenuContents: Dispatch<SetStateAction<boolean>>,
  toggleNavBarContents: Dispatch<SetStateAction<boolean>>,
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);