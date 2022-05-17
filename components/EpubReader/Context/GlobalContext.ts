import { createContext, Dispatch, SetStateAction, RefObject } from 'react';
import { EpubImages, EpubChapter } from '../Components/Nav Bar/Components/Menu/Components/Contents/Items/Getters';

export interface BookInfoType {
  title: string | null, author: string | null
}
export interface ReadInfoType {
  chapter: number | null, page: number | null
}

export interface EpubObject {
  chapters: EpubChapter[], images: EpubImages
}

export interface GlobalContextType {

  epub: EpubObject,
  setEpub: Dispatch<SetStateAction<EpubObject>>,

  canvasRef: RefObject<HTMLDivElement>,
  readingProgressBar: RefObject<HTMLDivElement>,

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