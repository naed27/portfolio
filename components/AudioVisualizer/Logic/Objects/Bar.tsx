import { getAverage } from "../../../../utility/functions";

interface constructorParamsType{
  readonly ctx:CanvasRenderingContext2D,
  readonly x?:number,
  readonly y?:number,
  readonly width?:number,
  readonly height?:number,
  readonly color?:string,
}

interface updateParams{
  readonly i:number,
  readonly frequency:number,
  readonly barCount:number,
  readonly neighbors:number[],
  readonly showStats?:boolean,
  readonly changeColor?:boolean,
  readonly fireBeat?:boolean,
  readonly fireNoise?:boolean,
}

interface barState{
  readonly x:number,
  readonly y:number,
  readonly width:number,
  readonly height:number,
  readonly color:string,
  readonly beatShadowColor: string,
  readonly noiseShadowColor: string,
  beatFadeTimer: number,
  noiseFadeTimer: number,
}

class Bar{

  readonly ctx:CanvasRenderingContext2D;

  readonly beatFadetimer = 45;
  readonly noiseFadetimer = 30;
  private current_state:barState;
  

  constructor({
    ctx,
    x = 0,
    y = ctx.canvas.height,
    width = 0,
    height = ctx.canvas.height,
    color='rgb(0,139,139)',
  }:constructorParamsType){
    this.ctx=ctx;
    this.current_state = {
      x:x,
      y:y,
      width:width,
      height:height,
      color:color,
      beatFadeTimer: 0,
      noiseFadeTimer: 0,
      beatShadowColor: 'rgb(0,0,0)',
      noiseShadowColor: 'rgb(0,0,0)',
    }
  }

  
  readonly draw = (updateParams:updateParams):void =>{
    const freshProperties = this.update(updateParams);
    const {x,y,width,height,color,beatFadeTimer, beatShadowColor, noiseFadeTimer, noiseShadowColor} = freshProperties;
    const strokeWidth = 1;

    this.ctx.beginPath();

    //beat shadow
    if(beatFadeTimer>0){
      this.ctx.fillStyle = beatShadowColor;
      this.ctx.fillRect(x-strokeWidth,0,width+strokeWidth,y);
      this.ctx.fill();
    }

    //noise shadow
    if(noiseFadeTimer>0){
      this.ctx.fillStyle = noiseShadowColor;
      this.ctx.fillRect(x-strokeWidth,0,width+strokeWidth,y);
      this.ctx.fill();
    }

    //frequency bar
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x-strokeWidth,height,width+strokeWidth,y);
    this.ctx.fill();
   
    this.ctx.closePath();

    

  }
  

  readonly update = (updateParams:updateParams):barState =>{
    const {i ,frequency,neighbors,barCount, fireBeat = false, fireNoise = false} = updateParams;

    const {
      x:previous_x,
      y:previous_y,
      width:previous_width,
      height:previous_height,
      color:previous_color,
      beatFadeTimer:previous_beatFadeTimer,
      noiseFadeTimer:previous_noiseFadeTimer,
    } = this.current_state

    const bottom = this.ctx.canvas.height-3;
    const canvasWidth = this.ctx.canvas.width
    
    const averageFrequency = getAverage([frequency,...neighbors]);
    const width = canvasWidth/barCount;
    const x = width*i;
    const height = bottom-(averageFrequency*0.15)
    const y = bottom;
    const color = 'rgb(0,139,139)'

    const beatShadowColor = (()=>{
      if(previous_beatFadeTimer>1){
        const fadePercentage = previous_beatFadeTimer/this.beatFadetimer
        const rgbValue = Math.floor(180*fadePercentage)
        return `rgb(0,${rgbValue},${rgbValue})`
      }
      return 'rgb(0,0,0)'
    })()

    const noiseShadowColor = (()=>{
      if(previous_noiseFadeTimer>1){
        const fadePercentage = previous_noiseFadeTimer/this.noiseFadetimer
        const rgbValue = Math.floor(50*fadePercentage)
        return `rgb(0,${rgbValue},${rgbValue})`
      }
      return 'rgb(0,0,0)'
    })()


    const beatFadeTimer = (fireBeat)?this.beatFadetimer:(previous_beatFadeTimer>0)?previous_beatFadeTimer-1:0
    const noiseFadeTimer = (fireNoise)?this.noiseFadetimer:(previous_noiseFadeTimer>0)?previous_noiseFadeTimer-1:0

    return this.current_state = {
      x,
      y,
      width,
      height,
      color,
      beatFadeTimer,
      noiseFadeTimer,
      beatShadowColor,
      noiseShadowColor
    }
  }




}

export default Bar;