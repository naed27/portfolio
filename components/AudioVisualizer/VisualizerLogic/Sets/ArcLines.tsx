import { getAverage, getDifference, getNeighbors } from "../../../../utility/functions";
import ArcLine from "../Objects/ArcLine";

interface constructorParamsType{
  readonly ctx:CanvasRenderingContext2D,
  readonly base_radius:number,
}

class ArcLines{

  readonly ctx:CanvasRenderingContext2D;
  readonly BASE_RADIUS:number;
  readonly arcLineStore:ArcLine[]=[];

  constructor({
    ctx,
    base_radius
  }:constructorParamsType){
    this.ctx=ctx;
    this.BASE_RADIUS=base_radius
  }

  readonly parse = (frequencyArray:Uint8Array)=>{

    const leftside =[]
    const rightside = []
    const requirement = 18;
    const average = Math.floor(getAverage(frequencyArray));
    for (let i = 0; i < frequencyArray.length; i++) {
      const frequency = frequencyArray[i];
      const difference = getDifference(average,frequency);
      if(difference<requirement){
        leftside.push(0);
        rightside.push(0);
      }else{
        leftside.push(frequency);
        rightside.push(frequency);
      }
    }

    const merged = [...leftside,...rightside.reverse()]
    const percentage = Math.floor(merged.length*0.75);
    return [...merged.slice(percentage,merged.length),...merged.slice(0,percentage)]

  }

  readonly flatten = (frequencies:number[],neighborCount:number)=>{
    const flattenedArray = [];
    for (let i = 0; i < frequencies.length; i++) {
      const frequency = frequencies[i];
      const neighbors = getNeighbors(frequencies,i,neighborCount);
      const average = getAverage([...neighbors,frequency]);
      flattenedArray.push(average);
    }
    return flattenedArray
  }

  readonly smoothen = (numbers:number[],neighborCount:number,loopCount:number):number[]=>{
    let result:number[]=[];
  
    while(loopCount!=0){
  
      let temp:number[] = [];
      if(result.length>0)numbers=result;
  
      for (let i = 0; i < numbers.length; i++) {
        const frequency = numbers[i];
        const neighbors = getNeighbors(numbers,i,neighborCount);
        const average = getAverage([...neighbors,frequency]);
        temp.push(average);
      }
      loopCount--
      result=temp;
    }
    
    return result
  }


  readonly drawArcLines = (frequencyArray:Uint8Array)=> {
  
    // get the frequency range 
    const start = Math.floor(frequencyArray.length*0.2);
    const end = frequencyArray.length-start;
    const rangedArray = frequencyArray.slice(start,end)

    // prepare
    const frequencies = this.parse(rangedArray)

    const flattenedArray = this.flatten(frequencies,26); //20
    let smoothenedArray = this.smoothen(flattenedArray,4,7); //4 - 7
    smoothenedArray = this.smoothen(smoothenedArray,2,1);
    
    const arcLineStore = this.getArcLineStore(frequencies);
    const lineCount = arcLineStore.length;

    for (let i = 0; i < smoothenedArray.length; i++) {
      const arcLine = arcLineStore[i];
      const frequency = smoothenedArray[i];
      arcLine.draw({i,frequency,lineCount});
    }
    
  }


  

  readonly getArcLineStore = (frequencyArray:Uint8Array|number[]):ArcLine[] =>{
    if(this.ctx===null)return this.arcLineStore
    if(this.arcLineStore.length!==0)return this.arcLineStore
    if(this.arcLineStore.length<0)return []
    
    return this.setArcLineStore(frequencyArray);
  }

  readonly setArcLineStore = (frequencyArray:Uint8Array|number[]):ArcLine[]=>{
    for (let i = 0; i < frequencyArray.length; i++) {
      this.arcLineStore.push(new ArcLine({
        ctx:this.ctx,
        baseRadius:this.BASE_RADIUS
      }));
    }
    return this.arcLineStore;
  }

}

export default ArcLines;