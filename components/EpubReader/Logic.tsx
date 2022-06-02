import { useState, useEffect, useRef, useContext } from "react";
import { LayoutContext } from "../Layout/Context/LayoutContext";
import { BookInfoType, CanvasPreferences, CanvasSize, EpubObject, GlobalContextType, ReadInfoType } from "./Context/GlobalContext";

const DEFAULT_PREFERENCES = {
  padding: 20,
  color: null,
  fontSize: null,
  fontFamily: null,
  textAlign: null,
  backgroundColor: null,
}

const DEFAULT_CANVAS_SIZE = {
  width:0,
  height:0,
}

export default function Logic() {
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const [epub, setEpub] = useState<EpubObject>({chapters:[], resources:{}})

  const canvasRef = useRef<HTMLDivElement>(null)
  const readingProgressBar = useRef<HTMLDivElement>(null)
  
  const [canvasSize, setCanvasSize] = useState<CanvasSize>(DEFAULT_CANVAS_SIZE)
  const [canvasPreferences, setCanvasPreferences] = useState<CanvasPreferences>(DEFAULT_PREFERENCES)
  
  const [parsingStatus, setParsingStatus] = useState<boolean>(false)

  const [bookInfo, setBookInfo] = useState<BookInfoType | null>(null)
  const [readInfo, setReadInfo] = useState<ReadInfoType | null>(null)
  
  const [maxPage, setMaxPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [showChapters, toggleChapters] = useState(false)
  const [showBookInfo, toggleBookInfo] = useState(false)
  const [showSettings, toggleSettings] = useState(false)
  const [showFileManager, toggleFileManager] = useState(false)
  const [showMenuContents, toggleMenuContents] = useState(false)
  const [showNavBarContents, toggleNavBarContents] = useState(false)

  const globalValues:GlobalContextType = {

    epub,
    setEpub,

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

    maxPage, 
    setMaxPage,
    currentPage, 
    setCurrentPage,

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