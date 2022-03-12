import Arc from './Objects/Arc';
import AudioManager from './AudioManager';
import ArcLineSet from './Sets/ArcLineSet';

export default function world (
  inputRef:any,
  canvasRef:any,
  containerRef:any,
  playButtonRef:any,
  progressLineRef:any,
  setPlaying:any
):{ ():void } | void {


  //setup canvas and context
  if (containerRef.current === null||canvasRef.current === null || inputRef.current===null) return
  const container:HTMLDivElement = containerRef.current
  const canvas:HTMLCanvasElement = canvasRef.current
  const playButton:HTMLDivElement = playButtonRef.current;
  const inputHolder:HTMLInputElement = inputRef.current;
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
  
  const arcLines = new ArcLineSet({
    ctx:ctx,
    baseRadius:60
  })

  const audioManager = new AudioManager({ isPlayingStatus: setPlaying })

  const{ audio, playPauseAudio, changeAudio } = audioManager;

  let animationFrameId:number;
  const animate = ():void=>{
    const { audioAnalyser,frequencyArray } = audioManager;
    if(audioAnalyser!==null&&frequencyArray!==null){
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      audioAnalyser.getByteFrequencyData(frequencyArray)
      arcLines.draw(frequencyArray);
      updateProgress(audio);
    }
    animationFrameId = window.requestAnimationFrame(()=>animate())
  }

  animate();

  const updateProgress = (audio:HTMLAudioElement)=>{
    const {duration, currentTime} = audio
    const progressPercent = (currentTime/duration)*100;
    progressLine.style.width=`${progressPercent}%`
  }

  playButton.addEventListener('click',playPauseAudio)
  inputHolder.addEventListener('change',changeAudio)  

  return ()=>{
    audio.src = '';
    window.cancelAnimationFrame(animationFrameId);
    playButton.removeEventListener('click',playPauseAudio);
    inputHolder.removeEventListener('change',changeAudio);
  }
}




