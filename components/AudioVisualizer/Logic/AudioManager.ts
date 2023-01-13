import { Dispatch, SetStateAction } from "react";
import { toBase64 } from '../../../utility/functions'

interface ListenerParams{
  setPlaying: Dispatch<SetStateAction<boolean>>
  progressBar: HTMLDivElement
}

export default class AudioManager{

  readonly audio: HTMLAudioElement = new Audio();

  start: boolean = false;
  isPlaying: boolean = false;
  audioIsEmpty: boolean = true;
  
  readonly progressBar: HTMLDivElement;
  readonly isPlayingStatus: Dispatch<SetStateAction<boolean>>;

  readonly baseBinCount: number = 256;
  readonly binCountPercentage: number = (70) / 100;
  readonly frequencyLength: number = Math.floor((this.baseBinCount/2) * this.binCountPercentage);

  bufferLength: number | null = null;
  frequencyArray: Uint8Array | null = null;
  audioContext: AudioContext | null = null;
  audioAnalyser: AnalyserNode | null = null;
  audioSource: MediaElementAudioSourceNode | null = null;

  constructor({ setPlaying: isPlayingStatus, progressBar }:ListenerParams){
    this.isPlayingStatus = isPlayingStatus
    this.progressBar = progressBar
  }

  readonly clearCasette = () =>{
    this.audio.pause();
    this.audio.src = '';
    this.audioIsEmpty = true;
    this.isPlaying = false;
    this.isPlayingStatus(false)
    this.progressBar.style.width=`0%`
    return console.log('empty audio'); 
  }

  readonly playPauseAudio = () => {  
    if(this.audioIsEmpty) 
      return console.log('empty audio'); 

    if(this.isPlaying){ 
      this.isPlaying = false;
      this.isPlayingStatus(false)
      this.audio.pause();
      return 
    }

    this.isPlaying = true;
    this.isPlayingStatus(true)
    this.audio.play();
    return 
  }

  readonly endAudio = () =>{
    this.isPlaying = false;
    this.isPlayingStatus(false)
  }

  readonly setPlaytime = (e: any)=>{
    if(this.audio.src==='') return
    const {offsetWidth: LineWidth} = e.target as HTMLDivElement
    const point = e.layerX
    const percentage = ((point / LineWidth)*100)
    this.progressBar.style.width=`${percentage}%`
    
    const {duration} = this.audio
    const rawPercentage = percentage/100
    this.audio.currentTime = duration*rawPercentage
  }

  readonly changeAudio = async (e:any)=>{
    console.log('uploaded mp3 file')
    if (e.target.files[0]) {
      if(e.target.files[0].type !== 'audio/mpeg')
        return this.clearCasette();
      const fileData = await toBase64(e.target.files[0]) as string;
      this.audioIsEmpty = false;
      this.audio.src = fileData;
      this.isPlaying = false;
      this.isPlayingStatus(false)
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

}
