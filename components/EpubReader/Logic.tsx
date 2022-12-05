import { useState, useEffect, useRef, useContext } from 'react';
import { LayoutContext } from '../Layout/Context/LayoutContext';
import { BookInfoType, CanvasPreferences, CanvasSize, EpubObject, GlobalContextType, Page, RawEpub, ReadInfoType } from "./Types/Types";

const DEFAULT_PREFERENCES = {
  padding: 20,
  color: null,
  fontSize: null,
  fontFamily: null,
  textAlign: null,
  backgroundColor: null,
}

const DEFAULT_CANVAS_SIZE = {
  width:`${0}px`,
  height:`${0}px`,
}

export default function Logic() {
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const [epub, setEpub] = useState<EpubObject>({sections:[], styles: {}, images: {}})

  const sizerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const readingProgressBar = useRef<HTMLDivElement>(null)
  
  const [canvasSize, setCanvasSize] = useState<CanvasSize>(DEFAULT_CANVAS_SIZE)
  const [canvasPreferences, setCanvasPreferences] = useState<CanvasPreferences>(DEFAULT_PREFERENCES)
  
  const [parsingStatus, setParsingStatus] = useState<boolean>(false)

  const [bookInfo, setBookInfo] = useState<BookInfoType | null>(null)
  const [readInfo, setReadInfo] = useState<ReadInfoType | null>(null)
  
  const [pages, setPages] = useState<Page[]>([]);
  const [maxPage, setMaxPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [sectionLength, setSectionLength] = useState(0)
  const [finalJSX, setFinalJSX] = useState<JSX.Element[]>([])

  const [reprintFlag, setReprintFlag] = useState(false)

  const [showChapters, toggleChapters] = useState(false)
  const [showBookInfo, toggleBookInfo] = useState(false)
  const [showSettings, toggleSettings] = useState(false)
  const [showFileManager, toggleFileManager] = useState(false)
  const [showMenuContents, toggleMenuContents] = useState(false)
  const [showNavBarContents, toggleNavBarContents] = useState(false)

  const globalValues:GlobalContextType = {

    epub,
    setEpub,

    sizerRef,
    canvasRef,
    readingProgressBar,
    
    canvasSize, 
    setCanvasSize,
    canvasPreferences, 
    setCanvasPreferences,

    parsingStatus, 
    setParsingStatus,

    bookInfo, 
    readInfo, 
    setBookInfo,
    setReadInfo,

    pages, 
    setPages,
    maxPage, 
    setMaxPage,
    currentPage, 
    setCurrentPage,

    sectionLength,
    setSectionLength,
    finalJSX,
    setFinalJSX,
    
    reprintFlag, 
    setReprintFlag,

    showChapters, 
    showBookInfo, 
    showSettings, 
    showFileManager, 
    showMenuContents, 
    showNavBarContents,
    
    toggleChapters,
    toggleBookInfo,
    toggleSettings,
    toggleFileManager,
    toggleMenuContents,
    toggleNavBarContents,

  }

  useEffect(()=> setAbsoluteNavBar(false), [ setAbsoluteNavBar ])

  useEffect(() => {
    console.log('Epub Reader on Standby.');
  },[])

  return {globalValues}
}