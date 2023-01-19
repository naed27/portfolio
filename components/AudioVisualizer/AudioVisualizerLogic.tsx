import world from "./Logic/CanvasLogic";
import { GlobalContextType } from "./Types/GlobalTypes";
import { LayoutContext } from "../Layout/Context/LayoutContext";
import { useState, useEffect, useRef, useContext } from "react";

export default function AudioVisualizerLogic() {
  
  const { setAbsoluteNavBar } = useContext(LayoutContext)

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); 
  
  const playButtonRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const audioDurationRef = useRef<HTMLDivElement>(null);
  const audioCurrentTimeRef = useRef<HTMLDivElement>(null);
  const audioTrackSliderPointRef = useRef<HTMLDivElement>(null);
  const audioTrackSliderProgressRef = useRef<HTMLDivElement>(null);
  const audioTrackSliderContainerRef = useRef<HTMLDivElement>(null);

  const [audioTitle, setAudioTitle] = useState<string|null>(null);
  const [audioPlayingStatus, setAudioPlayingStatus] = useState<boolean>(false);

  const globalValues:GlobalContextType = {
    inputRef,
    canvasRef,
    containerRef,
    playButtonRef,
    progressBarRef, 
    progressLineRef,
    audioDurationRef,
    audioCurrentTimeRef,
    audioTrackSliderPointRef,
    audioTrackSliderProgressRef,
    audioTrackSliderContainerRef,
    audioTitle, setAudioTitle,
    audioPlayingStatus, setAudioPlayingStatus,
  }

  useEffect(()=> setAbsoluteNavBar(false), [ setAbsoluteNavBar ])

  useEffect(() => {
    console.log('Audio Visualizer on Standby.');
    const cleaners = world({
      inputRef,
      canvasRef,
      containerRef,
      playButtonRef,
      audioDurationRef,
      audioCurrentTimeRef,
      audioTrackSliderPointRef,
      audioTrackSliderProgressRef,
      audioTrackSliderContainerRef,
      setAudioPlayingStatus, setAudioTitle,
    });
    return ()=> cleaners && cleaners()
  },[])

  return {globalValues}
}