import { Dispatch, SetStateAction } from "react";
import { toBase64 } from '../../../utility/functions'

interface ListenerParams{
  readingStatusToggler: Dispatch<SetStateAction<boolean>>
  // progressLine: HTMLDivElement
}

export default class FileManager{

  start: boolean = false;
  isReading: boolean = false;
  fileIsEmpty: boolean = true;
  
  // readonly progressLine: HTMLDivElement;
  readonly readingStatusToggler: Dispatch<SetStateAction<boolean>>;

  constructor({ readingStatusToggler }:ListenerParams){
    this.readingStatusToggler = readingStatusToggler
    // this.progressLine = progressLine
  }

  readonly clearCasette = () =>{
    this.fileIsEmpty = true;
    this.isReading = false;
    this.readingStatusToggler(false)
    // this.progressLine.style.width=`0%`
    return console.log('empty file'); 
  }

  readonly toggleReadingStatus = () => {  
    if(this.fileIsEmpty) 
      return console.log('empty file'); 

    if(this.isReading){ 
      this.isReading = false;
      this.readingStatusToggler(false)
      return 
    }

    this.isReading = true;
    this.readingStatusToggler(true)
    return 
  }

  readonly endAudio = () =>{
    this.isReading = false;
    this.readingStatusToggler(false)
  }

  readonly changeFile = async (e:any)=>{
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      if(e.target.files[0].type !== 'audio/mpeg')
        return this.clearCasette();
      const fileData = await toBase64(e.target.files[0]) as string;
      console.log(fileData)
      this.fileIsEmpty = false;
      this.isReading = false;
      this.readingStatusToggler(false)
      if(!this.start){
        this.start=true
      }
    }
  }

}
