import { getAverage, getDifference, getNeighbors } from "../../../utility/functions";
import Bar from "../Objects/Bar";

interface constructorParamsType{
  readonly ctx:CanvasRenderingContext2D,
}

class Bars{

  readonly ctx:CanvasRenderingContext2D;
  readonly barStore:Bar[]=[];

  constructor({
    ctx
  }:constructorParamsType){
    this.ctx=ctx;
  }

  readonly parse = (frequencyArray:Uint8Array)=>{
   
    const leftside =[]
    const rightside = []
    const requirement = 0;
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
    return [...leftside,...rightside.reverse()];
  }

  readonly drawBars = (frequencyArray:Uint8Array)=> {
  
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

  readonly getBarStore = (frequencyArray:Uint8Array|number[]):Bar[] =>{
    if(this.ctx===null)return this.barStore
    if(this.barStore.length!==0)return this.barStore
    if(this.barStore.length<0)return []
    
    return this.setupBarStore(frequencyArray);
  }

  readonly setupBarStore = (frequencyArray:Uint8Array|number[]):Bar[]=>{
    const barCount = frequencyArray.length;
    const canvasWidth = this.ctx.canvas.width;
    const canvasBottom = this.ctx.canvas.height;
    const barWidth = canvasWidth/barCount;

    for (let i = 0; i < barCount; i++) {
      this.barStore.push(new Bar({ctx:this.ctx}));
    }

    return this.barStore;
  }

}

export default Bars;