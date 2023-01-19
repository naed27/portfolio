import { Dispatch, SetStateAction } from 'react';
import { parseTime, toBase64 } from '../../../utility/functions';

interface ConstructorProps{
  audioDurationElement: HTMLDivElement,
  audioCurrentTimeElement: HTMLDivElement,
  audioTrackSliderPointElement: HTMLDivElement,
  audioTrackSliderProgressElement: HTMLDivElement,
  audioTrackSliderContainerElement: HTMLDivElement,

  setAudioTitle: Dispatch<SetStateAction<string | null>>
  setAudioPlayingStatus: Dispatch<SetStateAction<boolean>>
}

export default class AudioManager{

  audio: HTMLAudioElement = new Audio()

  start: boolean = false;
  isPlaying: boolean = false;
  audioIsEmpty: boolean = true;
  clickingAudioTrack: boolean = false;

  audioTitle: string | null = null;

  audioDurationElement: HTMLDivElement
  audioCurrentTimeElement: HTMLDivElement
  audioTrackContainerElement: HTMLDivElement
  audioTrackSliderPointElement: HTMLDivElement
  audioTrackSliderProgressElement: HTMLDivElement
  audioTrackSliderContainerElement: HTMLDivElement

  trackSliderIsAlive: boolean = false;

  readonly setAudioTitle: Dispatch<SetStateAction<string | null>>
  readonly setAudioPlayingStatus: Dispatch<SetStateAction<boolean>>

  readonly baseBinCount: number = 256;
  readonly binCountPercentage: number = (70) / 100;
  readonly frequencyLength: number = Math.floor((this.baseBinCount/2) * this.binCountPercentage);

  bufferLength: number | null = null;
  frequencyArray: Uint8Array | null = null;
  audioContext: AudioContext | null = null;
  audioAnalyser: AnalyserNode | null = null;
  audioSource: MediaElementAudioSourceNode | null = null;

  constructor ({
    audioDurationElement,
    audioCurrentTimeElement,
    audioTrackSliderPointElement,
    audioTrackSliderProgressElement,
    audioTrackSliderContainerElement,
    setAudioTitle, 
    setAudioPlayingStatus
  }: ConstructorProps) {
    
    this.audioDurationElement = audioDurationElement
    this.audioCurrentTimeElement = audioCurrentTimeElement
    this.audioTrackSliderPointElement = audioTrackSliderPointElement
    this.audioTrackSliderProgressElement = audioTrackSliderProgressElement
    this.audioTrackSliderContainerElement = audioTrackSliderContainerElement
    this.audioTrackContainerElement = audioTrackSliderContainerElement.offsetParent as HTMLDivElement

    this.setAudioTitle = setAudioTitle
    this.setAudioPlayingStatus = setAudioPlayingStatus
  }

  readonly resetPlay = () => {
    this.audio.pause();
    this.audio.currentTime = 0
    this.setPlayingStatus(false)
  }

  readonly clearCasette = () =>{
    this.resetPlay();
    this.audio.src = '';
    this.audioIsEmpty = true;
    return console.log('empty audio');
  }

  readonly playPauseAudio = () => {  
    if(this.audioIsEmpty) 
      return console.log('empty audio'); 

    if(this.isPlaying){ 
      this.setPlayingStatus(false)
      this.audio.pause();
      return 
    }

    this.setPlayingStatus(true)
    this.audio.play();
    return 
  }

  readonly endAudio = () =>{
    this.setPlayingStatus(false)
  }



  // --------------------------- Progress Tracker

  readonly updateTrackTime = () =>{
    if(this.trackSliderIsAlive === true) return
    
    const {duration, currentTime} = this.audio

    if(this.audioIsEmpty||isNaN(duration)||isNaN(currentTime))return
    
    this.audioDurationElement.dataset.timevalue = parseTime(duration)
    this.audioCurrentTimeElement.dataset.timevalue = parseTime(currentTime)
    this.audioTrackSliderProgressElement.style.width = `${(currentTime/duration)*100}%`

    if(currentTime===duration) this.resetPlay()
    
  }

  readonly customSetTrackSlider = (e: any) => {
    if(this.audioIsEmpty) return

    const rawPoint = e.clientX;
    const { offsetLeft: sliderLeft, offsetWidth:sliderWidth } = this.audioTrackSliderContainerElement
    const point = rawPoint - sliderLeft
    const percentage = (point/sliderWidth)
    if(percentage < 0 || percentage > 1) return
    const currentTime = this.audio.duration * percentage
    this.audioCurrentTimeElement.dataset.timevalue = parseTime(currentTime)
    this.audioTrackSliderProgressElement.style.width = `${percentage*100}%`
    
  }

  readonly reviveTrackSlider = (e:any) => {
    if(this.audioIsEmpty) return
    
    if(this.trackSliderIsAlive===false){
      this.trackSliderIsAlive = true
      this.customSetTrackSlider(e)
    }
    document.addEventListener('mousemove',this.customSetTrackSlider)
    document.addEventListener('mouseup',this.killTrackSlider)
  }

  readonly killTrackSlider = () => {
    if(this.audioIsEmpty) return
    if(!this.trackSliderIsAlive) return

    document.removeEventListener('mousemove',this.customSetTrackSlider)
    document.removeEventListener('mouseup',this.killTrackSlider)
    const timePercetage = Number(this.audioTrackSliderProgressElement.style.width.slice(0, -1))/100
    this.audio.currentTime = timePercetage * this.audio.duration
    this.trackSliderIsAlive = false
  }

  // --------------------------- Change Audio
 
  readonly changeAudio = async (e:any)=>{
    if (e.target.files[0]) {
      if(e.target.files[0].type !== 'audio/mpeg')
        return this.clearCasette();
      console.log('MP3 file uploaded.')
      this.setAudioTitle(e.target.files[0].name.slice(0, -4))
      this.resetPlay()
      const fileData = await toBase64(e.target.files[0]) as string;
      this.audio.src = fileData;
      this.audioIsEmpty = false;

      // one-time run only
      if(!this.start){
        this.audioContext = new AudioContext();
        this.audioAnalyser = this.audioContext.createAnalyser();
        this.audioSource = this.audioContext.createMediaElementSource(this.audio);
        this.audioSource.connect(this.audioAnalyser);
        this.audioAnalyser.connect(this.audioContext.destination);
        this.audioAnalyser.fftSize = this.baseBinCount;
        this.bufferLength = Math.floor(this.audioAnalyser.frequencyBinCount*this.binCountPercentage);
        this.frequencyArray = new Uint8Array(this.bufferLength);
        this.start=true
      }

    }
  }



  // ----------------------------- Setters and Getters

  readonly setPlayingStatus = (a:boolean) => {
    this.isPlaying = a
    this.setAudioPlayingStatus(a)
  }
  
}
