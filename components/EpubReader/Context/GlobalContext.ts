import { createContext, Dispatch, SetStateAction, RefObject } from 'react';
import { EpubChapter } from '../../../pages/api/epub/parse';

export interface BookInfoType {
  title: string | null, author: string | null
}

export interface ReadInfoType {
  chapter: number | null, page: number | null
}

export interface KeyValuePairs {
  [key: string]: any
}

export interface EpubObject {
  chapters: EpubChapter[], 
  resources: KeyValuePairs,
}

export interface CanvasPreferences {
  padding: number,
  color: string | null,
  fontSize: number | null,
  fontFamily: string | null,
  textAlign: string | null,
  backgroundColor: string | null,
}

export interface CanvasSize {
  width: number, 
  height: number
}

export interface GlobalContextType {

  epub: EpubObject,
  setEpub: Dispatch<SetStateAction<EpubObject>>,

  canvasRef: RefObject<HTMLDivElement>,
  readingProgressBar: RefObject<HTMLDivElement>,

  canvasSize: CanvasSize,
  setCanvasSize: Dispatch<SetStateAction<CanvasSize>>,

  canvasPreferences: CanvasPreferences
  setCanvasPreferences: Dispatch<SetStateAction<CanvasPreferences>>,

  parsingStatus: boolean, 
  setParsingStatus: Dispatch<SetStateAction<boolean>>,

  bookInfo: BookInfoType | null,
  readInfo: ReadInfoType | null,

  setBookInfo: Dispatch<SetStateAction<BookInfoType | null>>,
  setReadInfo: Dispatch<SetStateAction<ReadInfoType | null>>,
  
  maxPage: number,
  setMaxPage: Dispatch<SetStateAction<number>>,

  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,

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