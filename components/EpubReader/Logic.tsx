import { useState, useEffect, useRef, useContext } from "react";
import { LayoutContext } from "../Layout/Context/LayoutContext";
import { BookInfoType, EpubObject, GlobalContextType, ReadInfoType } from "./Context/GlobalContext";

export default function Logic() {
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const [epub, setEpub] = useState<EpubObject>({chapters:[], files:{}, webRoots:{chapter:'',image:''}, fileKeys: {}});

  const canvasRef = useRef<HTMLDivElement>(null);
  const readingProgressBar = useRef<HTMLDivElement>(null);

  const [canvasSize, setCanvasSize] = useState<{width: number, height: number}>({width: 0, height: 0});
  
  const [parsingStatus, setParsingStatus] = useState<boolean>(false);

  const [bookInfo, setBookInfo] = useState<BookInfoType | null>(null);
  const [readInfo, setReadInfo] = useState<ReadInfoType | null>(null);

  const [showChapters, toggleChapters] = useState(false)
  const [showBookInfo, toggleBookInfo] = useState(false)
  const [showSettings, toggleSettings] = useState(false)
  const [showFileManager, toggleFileManager] = useState(false)
  const [showMenuContents, toggleMenuContents] = useState(false);
  const [showNavBarContents, toggleNavBarContents] = useState(false)

  const globalValues:GlobalContextType = {

    epub,
    setEpub,

    canvasRef,
    readingProgressBar,
    canvasSize, 
    setCanvasSize,

    parsingStatus, 
    setParsingStatus,

    bookInfo, 
    readInfo, 
    setBookInfo,
    setReadInfo,

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