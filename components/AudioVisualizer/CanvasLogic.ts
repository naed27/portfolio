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
):{ ():void } {

  const canvas = canvasRef.current as HTMLCanvasElement
  const container = containerRef.current as HTMLDivElement
  const inputHolder = inputRef.current as HTMLInputElement
  const playButton = playButtonRef.current as HTMLDivElement
  const progressLine = progressLineRef.current as HTMLDivElement

  canvas.width=container.offsetWidth;
  canvas.height=container.offsetHeight;
  console.log(`width: ${container.offsetWidth}`)
  console.log(`height: ${container.offsetHeight}`)
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  window.addEventListener('resize',()=>{
    canvas.width=container.offsetWidth;
    canvas.height=container.offsetHeight;
    ctx.canvas.width=container.offsetWidth;
    ctx.canvas.height=container.offsetHeight;
  })
  

  const audioManager = new AudioManager({ setPlaying, progressLine })

  const{ audio, playPauseAudio, changeAudio, endAudio, frequencyLength } = audioManager;

  const arcLines = new ArcLineSet({ ctx, frequencyLength })

  let animationFrameId: number;

  const animate = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const { audioAnalyser, frequencyArray } = audioManager;
    if(audioAnalyser && frequencyArray){
      audioAnalyser.getByteFrequencyData(frequencyArray)
      arcLines.draw(frequencyArray);
      updateProgress(audio);
    }else{
      arcLines.draw(new Array(frequencyLength).fill(0));
    }
    animationFrameId = window.requestAnimationFrame(animate)
  }

  animate();

  const updateProgress = (audio:HTMLAudioElement)=>{
    const {duration, currentTime} = audio
    const progressPercentage = (currentTime/duration)*100;
    progressLine.style.width=`${progressPercentage}%`
    if(progressPercentage === 100){
      endAudio();
      progressLine.style.width=`0%`;
    }
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




