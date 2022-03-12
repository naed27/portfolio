import { toBase64 } from "../../utility/functions";

interface ListenerParams{
  isPlayingStatus:any
}

export default class AudioManager{

  readonly audio: HTMLAudioElement = new Audio();

  start: boolean = false;
  isPlaying: boolean = false;
  audioIsEmpty: boolean = true;

  readonly customBinCount: number = 1024;
  readonly binCountPercentage: number = 70/100;
  readonly isPlayingStatus: any;

  bufferLength: number | null = null;
  frequencyArray: Uint8Array | null = null;
  audioContext: AudioContext | null = null;
  audioAnalyser: AnalyserNode | null = null;
  audioSource: MediaElementAudioSourceNode | null = null;

  constructor({
    isPlayingStatus
  }:ListenerParams){
    this.isPlayingStatus = isPlayingStatus
  }

  readonly playPauseAudio = ()=>{  
    if(this.audioIsEmpty){ return console.log('empty audio');}

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

  readonly changeAudio = async (e:any)=>{
    if (e.target.files[0]) {
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
        this.audioAnalyser.fftSize = this.customBinCount;
        this.bufferLength = this.audioAnalyser.frequencyBinCount*this.binCountPercentage;
        this.frequencyArray = new Uint8Array(this.bufferLength);
        this.start=true
      }
    }
  }

}
