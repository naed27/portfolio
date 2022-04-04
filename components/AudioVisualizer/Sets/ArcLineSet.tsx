import { getAverage, getDifference } from "../../../utility/functions";
import ArcLine from "../Objects/ArcLine";

interface constructorParamsType{
  readonly ctx:CanvasRenderingContext2D
}

export default class ArcLineSet{

  readonly ctx: CanvasRenderingContext2D;
  readonly BASE_RADIUS: number = 70;
  readonly offset = (20) / 100; // (start at 20% of total frequencies) / (end at 80% of total frequencies)
  readonly minimumFrequencyStrength = 0;

  arcLineStore: ArcLine [] = [];

  constructor({ ctx }: constructorParamsType){
    this.ctx = ctx;
  }

  trimFrequency = (frequencyArray: number[]) => {
    const start = Math.floor(frequencyArray.length * this.offset);
    const end = frequencyArray.length - start;
    return frequencyArray.slice(start,end)
  }

  draw = (frequencyArray:Uint8Array | number[])=> {
    const trimmedFrequencies = this.trimFrequency(frequencyArray as number[])
    const parsedFrequencies = this.parse(trimmedFrequencies)
    const arcLineStore = this.getArcLineStore(parsedFrequencies);
    parsedFrequencies.map((frequency, i) => arcLineStore[i].draw({i,frequency,lineCount: arcLineStore.length}))
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
    const percentage = Math.floor(res.length*0.75);
    return [...res.slice(percentage,res.length),...res.slice(0,percentage)];
  }

  getArcLineStore = ( frequencyArray: number[] ) => {
    if(this.arcLineStore.length===0)
      this.setArcLineStore(frequencyArray)
    return this.arcLineStore;
  }

  setArcLineStore = (frequencyArray: number[]) => {
    this.arcLineStore = frequencyArray.map(() => new ArcLine({ ctx:this.ctx, baseRadius:this.BASE_RADIUS }) )
  }

}