import { Dispatch, RefObject, SetStateAction } from 'react';
import AudioManager from './AudioManager';
import ArcLineSet from './Sets/ArcLineSet';

export default function world (
  inputRef:RefObject<HTMLInputElement>,
  canvasRef:RefObject<HTMLCanvasElement>,
  containerRef:RefObject<HTMLDivElement>,
  playButtonRef:RefObject<HTMLDivElement>,
  progressLineRef:RefObject<HTMLDivElement>,
  setPlaying:Dispatch<SetStateAction<boolean>>
):{ ():void } | void {

  if (
        inputRef.current === null
    ||  canvasRef.current === null 
    ||  containerRef.current === null 
    ||  playButtonRef.current === null
    ||  progressLineRef.current === null
  ) return
  
  const canvas:HTMLCanvasElement = canvasRef.current
  const container:HTMLDivElement = containerRef.current
  const inputHolder:HTMLInputElement = inputRef.current
  const playButton:HTMLDivElement = playButtonRef.current
  const progressLine:HTMLDivElement = progressLineRef.current

  canvas.width=container.offsetWidth;
  canvas.height=container.offsetHeight;
  console.log(`width: ${container.offsetWidth}`)
  console.log(`height: ${container.offsetHeight}`)
  const ctx:CanvasRenderingContext2D|null = canvas.getContext('2d');
  
  if(ctx===null) return

  window.addEventListener('resize',()=>{
    canvas.width=container.offsetWidth;
    canvas.height=container.offsetHeight;
    ctx.canvas.width=container.offsetWidth;
    ctx.canvas.height=container.offsetHeight;
  })
  
  const arcLines = new ArcLineSet({ ctx })

  const audioManager = new AudioManager({ setPlaying })

  const{ audio, playPauseAudio, changeAudio } = audioManager;

  let animationFrameId: number;

  const animate = () => {
    const { audioAnalyser, frequencyArray } = audioManager;
    if(audioAnalyser && frequencyArray){
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      audioAnalyser.getByteFrequencyData(frequencyArray)
      arcLines.draw(frequencyArray);
      updateProgress(audio);
    }
    animationFrameId = window.requestAnimationFrame(animate)
  }

  animate();

  const updateProgress = (audio:HTMLAudioElement)=>{
    const {duration, currentTime} = audio
    const progressPercentage = (currentTime/duration)*100;
    progressLine.style.width=`${progressPercentage}%`
  }

  playButton.addEventListener('click',playPauseAudio)
  inputHolder.addEventListener('change',changeAudio)  

  return () => {
    audio.src = '';
    window.cancelAnimationFrame(animationFrameId);
    playButton.removeEventListener('click',playPauseAudio);
    inputHolder.removeEventListener('change',changeAudio);
  }
}




