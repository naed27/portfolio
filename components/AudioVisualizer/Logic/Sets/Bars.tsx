import { getAverage, getDifference, getNeighbors, randomNumberBetween } from "../../../../utility/functions";
import Bar from '../Objects/Bar'

interface constructorParamsType{
  readonly ctx:CanvasRenderingContext2D,
}

class Bars{

  readonly ctx: CanvasRenderingContext2D;
  readonly barStore: Bar[] = [];
  currentAverageFrenquency = 0;
  previousAverageFrenquency = 0;

  constructor({ ctx }: constructorParamsType){
    this.ctx=ctx;
  }

  parse = (frequencyArray:Uint8Array | number[])=>{
   
    const leftside =[]
    const rightside = []
    const requirement = 0;
    const average = this.currentAverageFrenquency

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

  getBeatIndexes = (frequencyArray: number[]) => {
    const beatIndexes = [];
    const averageFrenquency = this.currentAverageFrenquency
    const difference = averageFrenquency - this.previousAverageFrenquency
    
    if(difference>=4){
      const halfOfPie = (frequencyArray.length/2)-1
      const indexA = randomNumberBetween({max:Math.floor(halfOfPie/1.8)})
      const indexB = halfOfPie+(halfOfPie - indexA)+1
      beatIndexes.push(indexA)
      beatIndexes.push(indexB)
    }

    return beatIndexes
  }

  getNoiseIndexes = (frequencyArray: number[]) => {
    const noiseIndex = [];
    const difference = getDifference(
      this.currentAverageFrenquency,
      this.previousAverageFrenquency
    )
    
    if(difference>=2 && difference<=3){
      const halfOfPie = (frequencyArray.length/2)-1
      const indexA = randomNumberBetween({max:Math.floor(halfOfPie/3)})
      const indexB = halfOfPie+(halfOfPie - indexA)+1
      noiseIndex.push(indexA)
      noiseIndex.push(indexB)
    }
    return noiseIndex
  }

  draw = (frequencyArray:Uint8Array | number[])=> {
    
    this.currentAverageFrenquency = Math.floor(getAverage(frequencyArray as number[]));

    const frequencies = this.parse(frequencyArray);
    const barStore = this.getBarStore(frequencies);
    const beatIndexes = this.getBeatIndexes(frequencies)
    const noiseIndexes = this.getNoiseIndexes(frequencies)

    this.previousAverageFrenquency = this.currentAverageFrenquency

    const barCount = barStore.length;

    for (let i = 0; i < barStore.length; i++) {
      const bar:Bar = barStore[i];
      const frequency = frequencies[i];
      const neighbors = getNeighbors(frequencies,i,2);
      const fireBeat = (beatIndexes.includes(i))?true:false
      const fireNoise = (noiseIndexes.includes(i))?true:false
      bar.draw({i,frequency,neighbors,barCount,fireBeat,fireNoise});
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