import { createContext, Dispatch, SetStateAction, RefObject } from 'react';
import { EpubItem } from '../Functions/FileHandlers';

export interface BookInfoType {
  title: string | null, author: string | null
}
export interface ReadInfoType {
  chapter: number | null, page: number | null
}

export interface GlobalContextType {

  epub: EpubItem[],
  setEpub: Dispatch<SetStateAction<EpubItem[]>>,

  fileInputRef: RefObject<HTMLInputElement>,
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