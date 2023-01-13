import { Dispatch, RefObject, SetStateAction } from 'react';
import AudioManager from './AudioManager';
import ArcLineSet from './Sets/ArcLineSet';

interface WorldProps{
  inputRef:RefObject<HTMLInputElement>,
  canvasRef:RefObject<HTMLCanvasElement>,
  containerRef:RefObject<HTMLDivElement>,
  playButtonRef:RefObject<HTMLDivElement>,
  progressBarRef:RefObject<HTMLDivElement>,
  progressLineRef:RefObject<HTMLDivElement>,
  setPlaying:Dispatch<SetStateAction<boolean>>
}

export default function world ({
  inputRef,
  canvasRef,
  setPlaying,
  containerRef,
  playButtonRef,
  progressBarRef,
  progressLineRef,
}:WorldProps):{ ():void } {

  const canvas = canvasRef.current as HTMLCanvasElement
  const container = containerRef.current as HTMLDivElement
  const inputHolder = inputRef.current as HTMLInputElement
  const playButton = playButtonRef.current as HTMLDivElement
  const progressBar = progressBarRef.current as HTMLDivElement
  const progressLine = progressLineRef.current as HTMLDivElement

  canvas.width=container.offsetWidth;
  canvas.height=container.offsetHeight;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  window.addEventListener('resize',()=>resizeCanvas({ctx,container,canvas}))

  const audioManager = new AudioManager({ setPlaying, progressBar })
  const arcLines = new ArcLineSet({ ctx, audioManager })

  const{ audio, playPauseAudio, changeAudio, setPlaytime } = audioManager;

  let animationFrameId: number | undefined;

  animate({ ctx, arcLines, audioManager, animationFrameId, progressBar});

  inputHolder.addEventListener('change',changeAudio)  
  progressLine.addEventListener('click',setPlaytime)
  playButton.addEventListener('click',playPauseAudio)

  return () => {
    audio.src = '';
    animationFrameId && window.cancelAnimationFrame(animationFrameId);
    inputHolder.removeEventListener('change',changeAudio);
    progressLine.removeEventListener('click',setPlaytime);
    playButton.removeEventListener('click',playPauseAudio);
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
  progressBar: HTMLDivElement,
  ctx: CanvasRenderingContext2D, 
}

const animate = (props: AnimateProps) => {

  let { ctx, arcLines, progressBar, audioManager, animationFrameId } = props

  clearCanvas(ctx)
  
  const { audioAnalyser, frequencyArray, frequencyLength } = audioManager;
  if(audioAnalyser && frequencyArray){
    audioAnalyser.getByteFrequencyData(frequencyArray)
    arcLines.draw(frequencyArray);
    updateProgress({audioManager, progressBar});
  }else{
    arcLines.draw(new Array(frequencyLength).fill(0));
  }

  animationFrameId = window.requestAnimationFrame(()=>animate(props))

}

// ------------- Progress Bar Function

interface ProgressProps {
  audioManager: AudioManager,
  progressBar: HTMLDivElement,
}

const updateProgress = ({audioManager, progressBar}:ProgressProps)=>{
  const { audio:{duration, currentTime}, endAudio } = audioManager
  const progressPercentage = (currentTime/duration)*100;
  progressBar.style.width=`${progressPercentage}%`
  if(progressPercentage === 100){
    endAudio();
    progressBar.style.width=`0%`;
  }
}


// ------------- Set Progress Function

const setProgress = () => {
  
}


// ------------- Clear Canvas Function

const clearCanvas = (ctx: CanvasRenderingContext2D) => 
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);