import { Dispatch, RefObject, SetStateAction } from 'react';
import AudioManager from './AudioManager';
import ArcLineSet from './Sets/ArcLineSet';

interface WorldProps{
  inputRef:RefObject<HTMLInputElement>,
  canvasRef:RefObject<HTMLCanvasElement>,
  containerRef:RefObject<HTMLDivElement>,
  playButtonRef:RefObject<HTMLDivElement>,
  audioDurationRef:RefObject<HTMLDivElement>,
  audioCurrentTimeRef:RefObject<HTMLDivElement>,
  audioTrackSliderPointRef:RefObject<HTMLDivElement>,
  audioTrackSliderProgressRef:RefObject<HTMLDivElement>,
  audioTrackSliderContainerRef:RefObject<HTMLDivElement>,
  setAudioTitle: Dispatch<SetStateAction<string|null>>,
  setAudioPlayingStatus: Dispatch<SetStateAction<boolean>>,
}

export default function world ({
  inputRef,
  canvasRef,
  containerRef,
  playButtonRef,
  audioDurationRef,
  audioCurrentTimeRef,
  audioTrackSliderPointRef,
  audioTrackSliderProgressRef,
  audioTrackSliderContainerRef,
  setAudioPlayingStatus,
  setAudioTitle, 
}:WorldProps):{ ():void } {


  const canvas = canvasRef.current as HTMLCanvasElement
  const container = containerRef.current as HTMLDivElement
  const inputHolderElement = inputRef.current as HTMLInputElement
  const playButtonElement = playButtonRef.current as HTMLDivElement
  const audioDurationElement= audioDurationRef.current as HTMLDivElement
  const audioCurrentTimeElement = audioCurrentTimeRef.current as HTMLDivElement
  const audioTrackSliderPointElement = audioTrackSliderPointRef.current as HTMLInputElement
  const audioTrackSliderProgressElement = audioTrackSliderProgressRef.current as HTMLDivElement
  const audioTrackSliderContainerElement = audioTrackSliderContainerRef.current as HTMLDivElement
  
  canvas.width=container.offsetWidth;
  canvas.height=container.offsetHeight;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const audioManager = new AudioManager({
    audioDurationElement,
    audioCurrentTimeElement,
    audioTrackSliderPointElement,
    audioTrackSliderProgressElement,
    audioTrackSliderContainerElement,

    setAudioTitle, 
    setAudioPlayingStatus,
  })

  window.addEventListener('resize',()=>resizeCanvas({ctx,container,canvas}))

  const arcLines = new ArcLineSet({ ctx, audioManager })

  const{ 
    changeAudio, 
    clearCasette,
    playPauseAudio,
    killTrackSlider,
    reviveTrackSlider,
    customSetTrackSlider,
  } = audioManager;

  let animationFrameId: number | undefined;

  animate({ ctx, arcLines, audioManager, animationFrameId });

  inputHolderElement.addEventListener('change', changeAudio)  
  playButtonElement.addEventListener('click', playPauseAudio)
  audioTrackSliderPointElement.addEventListener('mousedown',reviveTrackSlider)
  audioTrackSliderContainerElement.addEventListener('mousedown',reviveTrackSlider)

  return () => {
    clearCasette();
    animationFrameId && window.cancelAnimationFrame(animationFrameId);
    
    document.removeEventListener('mouseup',killTrackSlider);
    document.removeEventListener('mousemove',customSetTrackSlider);

    inputHolderElement.removeEventListener('change', changeAudio);
    playButtonElement.removeEventListener('click', playPauseAudio);
    audioTrackSliderPointElement.removeEventListener('mousedown',reviveTrackSlider);
  }
  
}


























// ------------- Resize Canvas Function

interface ResizeCanvasProps {
  canvas: HTMLCanvasElement,
  container: HTMLDivElement,
  ctx: CanvasRenderingContext2D,
}

const resizeCanvas = ({ctx,canvas,container}: ResizeCanvasProps) => {
  canvas.width=container.offsetWidth;
  canvas.height=container.offsetHeight;
  ctx.canvas.width=container.offsetWidth;
  ctx.canvas.height=container.offsetHeight;
}


// ------------- Animate Function

interface AnimateProps {
  arcLines: ArcLineSet,
  animationFrameId?: number,
  audioManager: AudioManager, 
  ctx: CanvasRenderingContext2D
}

const animate = (props: AnimateProps) => {

  let { ctx, arcLines, audioManager, animationFrameId } = props

  clearCanvas(ctx)
  
  const { audioAnalyser, frequencyArray, frequencyLength, updateTrackTime } = audioManager;
  if(audioAnalyser && frequencyArray){
    audioAnalyser.getByteFrequencyData(frequencyArray)
    arcLines.draw(frequencyArray);
    updateTrackTime()
  }else{
    arcLines.draw(new Array(frequencyLength).fill(0));
  }
  
  animationFrameId = window.requestAnimationFrame(()=>animate(props))

}


// ------------- Clear Canvas Function

const clearCanvas = (ctx: CanvasRenderingContext2D) => 
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);