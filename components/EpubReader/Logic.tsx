import { useState, useEffect, useRef, useContext } from "react";
import { LayoutContext } from "../Layout/Context/LayoutContext";
import { BookInfoType, GlobalContextType, ReadInfoType } from "./Context/GlobalContext";

export default function Logic() {
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const fileInputRef = useRef<HTMLInputElement>(null);
  const readingProgressBar = useRef<HTMLDivElement>(null);

  const [isReading, isReadingToggler] = useState<boolean>(false);

  const [bookInfo, setBookInfo] = useState<BookInfoType | null>(null);
  const [readInfo, setReadInfo] = useState<ReadInfoType | null>(null);

  const [showChapters, toggleChapters] = useState(false)
  const [showBookInfo, toggleBookInfo] = useState(false)
  const [showSettings, toggleSettings] = useState(false)
  const [showFileManager, toggleFileManager] = useState(false)
  const [showMenuContents, toggleMenuContents] = useState(false);
  const [showNavBarContents, toggleNavBarContents] = useState(false)

  const globalValues:GlobalContextType = {

    fileInputRef,
    readingProgressBar,

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