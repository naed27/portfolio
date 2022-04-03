import { getAverage, getDifference, getNeighbors } from "../../../utility/functions";
import ArcLine from "../Objects/ArcLine";

interface constructorParamsType{
  readonly ctx:CanvasRenderingContext2D
}

export default class ArcLineSet{

  readonly ctx: CanvasRenderingContext2D;
  readonly BASE_RADIUS: number = 60;
  readonly offset = (15) / 100; // (start at 20% of total frequencies) / (end at 80% of total frequencies)

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

    const smoothFrenquencies = this.smoothen(parsedFrequencies,2,15);
    
    const arcLineStore = this.getArcLineStore(smoothFrenquencies);
    const lineCount = arcLineStore.length;

    smoothFrenquencies.map((frequency, i) => {
      const arcLine = arcLineStore[i];
      arcLine.draw({i,frequency,lineCount});
    })
    
  }

  parse = (frequencyArray:Uint8Array | number[])=>{

    const leftside =[]
    const rightside = []
    const requirement = 8;
    const average = Math.floor(getAverage(frequencyArray as number[]));
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
    return [...merged.slice(percentage,merged.length),...merged.slice(0,percentage)];

  }

  smoothen = (frequencies:number[],neighborCount:number,loopCount:number):number[]=>{
    for(let i = 1; i <= loopCount; i++){
      frequencies = frequencies.map(( frequency, j ) =>
        getAverage( [...getNeighbors(frequencies, j, i > 1 ? neighborCount : 6), frequency] ));
    }
    return frequencies
  }

  getArcLineStore = ( frequencyArray: number[] ) => {
    if(this.arcLineStore.length===0)
      this.setArcLineStore(frequencyArray);
    return this.arcLineStore;
  }

  setArcLineStore = (frequencyArray: number[]) => {
    this.arcLineStore = frequencyArray.map(() => new ArcLine({ ctx:this.ctx, baseRadius:this.BASE_RADIUS }) )
  }

}