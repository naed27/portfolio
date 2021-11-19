import {getAverage} from '../../utility/functions'
import Arc from './Objects/Arc';
import ArcLines from './Sets/ArcLines'
import Bars from './Sets/Bars'
import Listener from './Objects/Listener';
import { Event } from 'react-cool-inview';

interface animationObjects{
  centerArc:Arc,
}


const world = (
  inputRef:any,
  canvasRef:any,
  containerRef:any,
  playButtonRef:any,
  progressLineRef:any,
  setPlaying:any
):{
  ():void
}|void=>{


  //setup canvas and context
  if (containerRef.current === null||canvasRef.current === null || inputRef.current===null) return
  const container:HTMLDivElement = containerRef.current
  const canvas:HTMLCanvasElement = canvasRef.current
  const playButton:HTMLDivElement = playButtonRef.current;
  const inputHolder:HTMLInputElement = inputRef.current;
  const audio:HTMLAudioElement = new Audio();
  const progressLine:HTMLDivElement = progressLineRef.current;
  canvas.width=container.offsetWidth;
  canvas.height=container.offsetHeight;
  console.log(`width: ${container.offsetWidth}`)
  console.log(`height: ${container.offsetHeight}`)
  const ctx:CanvasRenderingContext2D|null = canvas.getContext('2d');
  if(ctx===null)return

  window.addEventListener('resize',()=>{
    canvas.width=container.offsetWidth;
    canvas.height=container.offsetHeight;
    ctx.canvas.width=container.offsetWidth;
    ctx.canvas.height=container.offsetHeight;
  })

  
  const arcLines = new ArcLines({
    ctx:ctx,
    base_radius:60
  })

  const audioStats = new Listener({
    audio:audio,
    playButton:playButton,
    inputHolder:inputHolder,
    customBinCount:1024,
    binCountPercentage:70,
    reactPlayButtonUpdater:setPlaying
  })

  const{playAudio,changeAudio} = audioStats;


  let animationFrameId:number;
  const animate = ():void=>{
    const {audioAnalyser,frequencyArray} = audioStats;
    if(audioAnalyser!==null&&frequencyArray!==null){

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      audioAnalyser.getByteFrequencyData(frequencyArray)
      arcLines.drawArcLines(frequencyArray);
      updateProgress(audio);

    }
    animationFrameId = window.requestAnimationFrame(()=>{animate()})
  }

  animate();

  const updateProgress = (audio:HTMLAudioElement)=>{
    const {duration, currentTime} = audio
    const progressPercent = (currentTime/duration)*100;
    progressLine.style.width=`${progressPercent}%`
  }

  playButton.addEventListener('click',playAudio)
  inputHolder.addEventListener('change',changeAudio)  

  return ()=>{
    audio.src = "";
    window.cancelAnimationFrame(animationFrameId);
    playButton.removeEventListener('click',playAudio);
    inputHolder.removeEventListener('change',changeAudio);
  }
}

export default world




