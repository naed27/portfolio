import { useState, useEffect, useRef, useContext } from "react";
import { LayoutContext } from "../Layout/Context/LayoutContext";
import { GlobalContextType } from "./Context/GlobalContext";

export default function Logic() {
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const [showChapters, toggleChapters] = useState(false)
  const [showBookInfo, toggleBookInfo] = useState(false)
  const [showSettings, toggleSettings] = useState(false)
  const [showFileManager, toggleFileManager] = useState(false)
  const [showNavBarContents, toggleNavBarContents] = useState(false)

  const globalValues:GlobalContextType = {
    showChapters, 
    showBookInfo, 
    showSettings, 
    showFileManager, 
    showNavBarContents,

    toggleChapters,
    toggleBookInfo,
    toggleSettings,
    toggleFileManager,
    toggleNavBarContents,
  }

  useEffect(()=> setAbsoluteNavBar(false), [ setAbsoluteNavBar ])

  useEffect(() => {
    console.log('Epub Reader on Standby.');
  },[])

  return {globalValues}
}