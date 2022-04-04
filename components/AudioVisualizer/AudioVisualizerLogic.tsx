import { useState, useEffect, useRef } from "react";
import world from "./CanvasLogic";
import { GlobalContextType } from "./Types/GlobalTypes";

export default function AudioVisualizerLogic() {

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  const inputRef = useRef<HTMLInputElement>(null);
  
  const playButtonRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  const [audioTitle, setAudioTitle] = useState<string | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);


  const globalValues:GlobalContextType = {
    containerRef,
    canvasRef,
    inputRef,
    playButtonRef,
    progressLineRef, 
    audioTitle, setAudioTitle,
    playing, setPlaying,
  }

  useEffect(() => {
    console.log('Audio Visualizer on Standby.');
    const cleaners = world(inputRef,canvasRef,containerRef,playButtonRef,progressLineRef,setPlaying);
    return ()=> cleaners && cleaners()
  },[])

  return {globalValues}
}