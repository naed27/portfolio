import { getAverage, getDifference, getNeighbors } from "../../../utility/functions";
import Bar from "../Objects/Bar";

interface constructorParamsType{
  readonly ctx:CanvasRenderingContext2D,
}

class Bars{

  readonly ctx:CanvasRenderingContext2D;
  readonly barStore:Bar[]=[];

  constructor({ ctx }: constructorParamsType){
    this.ctx=ctx;
  }

  parse = (frequencyArray:Uint8Array | number[])=>{
   
    const leftside =[]
    const rightside = []
    const requirement = 0;
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
    return [...leftside,...rightside.reverse()];
  }

  drawBars = (frequencyArray:Uint8Array)=> {
  
    const frequencies = this.parse(frequencyArray);
    const barStore = this.getBarStore(frequencies);
    const barCount = barStore.length;

    for (let i = 0; i < barStore.length; i++) {
      const bar:Bar = barStore[i];
      const frequency:number = frequencies[i];
      const neighbors = getNeighbors(frequencies,i,30);
      bar.draw({i,frequency,neighbors,barCount});
    }
    
  }

  getBarStore = (frequencyArray:Uint8Array|number[]):Bar[] =>{
    if(this.barStore.length===0)
      this.setupBarStore(frequencyArray as number[])
    return this.barStore;
  }

  setupBarStore = (frequencyArray:number[]) => {
    frequencyArray.map(()=>this.barStore.push(new Bar({ctx:this.ctx})))
  }
    
}

export default Bars;