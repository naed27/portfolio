import { getAverage, getDifference } from "../../../utility/functions";
import ArcLine from "../Objects/ArcLine";

interface constructorParamsType{
  readonly ctx:CanvasRenderingContext2D
  readonly frequencyLength: number
}

export default class ArcLineSet{

  readonly ctx: CanvasRenderingContext2D;
  readonly BASE_RADIUS: number = 90;
  readonly offset = (20) / 100; // (start at 20% of total frequencies) / (end at 80% of total frequencies)
  readonly sizeOfSet: number = 0;
  readonly minimumFrequencyStrength = 0;

  arcLineStore: ArcLine [] = [];

  constructor({ ctx, frequencyLength }: constructorParamsType){
    this.ctx = ctx;
    const offset = Math.floor(frequencyLength * this.offset) 
    this.sizeOfSet = (frequencyLength - (offset*2))*2;

    for (let i = 0; i < this.sizeOfSet; i++) {
      this.arcLineStore.push( new ArcLine({ ctx:this.ctx, baseRadius:this.BASE_RADIUS }) )
    } 

  }

  trimFrequency = (frequencyArray: number[]) => {
    const offset = Math.floor(frequencyArray.length * this.offset);
    const start = offset
    const end = frequencyArray.length - offset;
    const res = frequencyArray.slice(start,end)
    return res
  }

  draw = (frequencyArray:Uint8Array | number[] )=> {
    const trimmedFrequencies = this.trimFrequency(frequencyArray as number[])
    const parsedFrequencies = this.parse(trimmedFrequencies)
    parsedFrequencies.map((frequency, i) => this.arcLineStore[i].draw({i,frequency,lineCount: this.sizeOfSet}))
  }

  parse = (frequencyArray:Uint8Array | number[])=>{
    const leftside =[]
    const rightside = []
    const average = Math.floor(getAverage(frequencyArray as number[]));

    for (let i = 0; i < frequencyArray.length; i++) {
      const frequency = frequencyArray[i];
      const difference = getDifference(average,frequency);

      if(difference<this.minimumFrequencyStrength){
        leftside.push(0);
        rightside.push(0);
      }else{
        leftside.push(frequency);
        rightside.push(frequency);
      }
    }
    const res = rightside.concat(leftside.reverse());
    const rotation = Math.floor(res.length*0.75);
    return [...res.slice(rotation,res.length),...res.slice(0,rotation)];
  }



}