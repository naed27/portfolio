import { useState, useEffect, useRef, useContext } from "react";
import { LayoutContext } from "../Layout/Context/LayoutContext";
import world from "./Logic/CanvasLogic";
import { GlobalContextType } from "./Types/GlobalTypes";

export default function AudioVisualizerLogic() {
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  const inputRef = useRef<HTMLInputElement>(null);
  
  const playButtonRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  const [audioTitle, setAudioTitle] = useState<string | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  const globalValues:GlobalContextType = {
    inputRef,
    canvasRef,
    containerRef,
    playButtonRef,
    progressBarRef, 
    progressLineRef,
    playing, setPlaying,
    audioTitle, setAudioTitle,
  }

  useEffect(()=> setAbsoluteNavBar(false), [ setAbsoluteNavBar ])

  useEffect(() => {
    console.log('Audio Visualizer on Standby.');
    const cleaners = world({
      inputRef,
      canvasRef,
      containerRef,
      playButtonRef,
      progressBarRef,
      progressLineRef,
      setPlaying,
    });
    return ()=> cleaners && cleaners()
  },[])

  return {globalValues}
}