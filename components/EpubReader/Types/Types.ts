import { HTMLElement as NodeElement } from "node-html-parser";
import { Dispatch, SetStateAction, RefObject, MutableRefObject } from 'react';
import { Book } from 'epubjs';

export type EpubNodeElement = NodeElement

export interface EpubChapter {
  id: string,
  htmlString: string,
}

export interface EpubJSXAttributes {
  src?: string;
  width?: string;
  xmlns?: string;
  height?: string;
  viewBox?: string;
  className?: string;
  xmlnsXlink?: string;
  style?: KeyValuePairs;
  preserveAspectRatio?: string;
}

export interface NodeChildren {
  node: NodeElement,
  ref: RefObject<null>,
}

export interface AdvancedEpubNode {
  node: NodeElement,
  selfRef: RefObject<null>,
  childrenRefTree: AdvancedEpubNode[],
} 

export interface BookInfoType {
  title: string | null, author: string | null
}

export interface ReadInfoType {
  chapter: number | null, page: number | null
}

export interface KeyValuePairs {
  [key: string]: any
}

export type RawEpub = Book | null

export type EpubObject = {
  sections: EpubChapter[], 
  images: KeyValuePairs,
  styles: KeyValuePairs,
}

export interface Page {
  sectionId: number,
  shards: JSX.Element[],
  parent?: string
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
  width: string, 
  height: string
}


export interface GlobalContextType {

  epub: EpubObject,
  setEpub: Dispatch<SetStateAction<EpubObject>>,

  sizerRef: RefObject<HTMLDivElement>,
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

  finalJSX: JSX.Element[],
  setFinalJSX: Dispatch<SetStateAction<JSX.Element[]>>,

  pages: Page[],
  setPages: Dispatch<SetStateAction<Page[]>>,

  maxPage: number,
  setMaxPage: Dispatch<SetStateAction<number>>,

  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  
  sectionLength: number,
  setSectionLength: Dispatch<SetStateAction<number>>,

  reprintFlag: boolean,
  setReprintFlag: Dispatch<SetStateAction<boolean>>,

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