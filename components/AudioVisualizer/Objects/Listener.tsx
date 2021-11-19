import { toBase64 } from "../../../utility/functions";

interface ListenerParams{
  audio:HTMLAudioElement,
  playButton:HTMLDivElement,
  inputHolder:HTMLInputElement,
  customBinCount?:number,
  binCountPercentage?:number,
  reactPlayButtonUpdater:any
}

class Listener{

  readonly audio:HTMLAudioElement;
  readonly playButton:HTMLDivElement;
  readonly inputHolder:HTMLInputElement;
  readonly customBinCount:number;
  readonly binCountPercentage:number;
  readonly reactPlayButtonUpdater:any

  audioIsEmpty:boolean = true;
  isPlaying:boolean = false;
  start:boolean = false;

  audioContext:AudioContext|null=null;
  audioAnalyser:AnalyserNode|null=null;
  audioSource:MediaElementAudioSourceNode|null=null;
  bufferLength:number|null=null;
  frequencyArray:Uint8Array|null=null;

  constructor({
    audio=new Audio(),
    playButton,
    inputHolder,
    customBinCount=1024,
    binCountPercentage=100,
    reactPlayButtonUpdater
  }:ListenerParams){
    this.audio=audio;
    this.playButton=playButton;
    this.inputHolder=inputHolder;
    this.customBinCount=customBinCount;
    this.binCountPercentage=binCountPercentage/100;
    this.reactPlayButtonUpdater = reactPlayButtonUpdater
  }

  readonly playAudio = ()=>{  
    if(this.audioIsEmpty){ return console.log('empty audio');}

    if(this.isPlaying){ 
      this.isPlaying = false;
      this.reactPlayButtonUpdater(false)
      this.audio.pause(); 
      
      return 
    }

    this.isPlaying = true;
    this.reactPlayButtonUpdater(true)
    this.audio.play();
    return 
  }

  readonly changeAudio = async (e:any)=>{
    if (e.target.files[0]) {
      const fileData = await toBase64(e.target.files[0]) as string;
      this.audioIsEmpty = false;
      this.audio.src = fileData;
      this.isPlaying = false;
      this.reactPlayButtonUpdater(false)
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

  readonly updateAudioControls = ()=>{
    
  }

}

export default Listener;