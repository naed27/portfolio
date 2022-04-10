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
}

interface barState{
  readonly x:number,
  readonly y:number,
  readonly width:number,
  readonly height:number,
  readonly color:string,
}

class Bar{

  readonly ctx:CanvasRenderingContext2D;

  private current_state:barState;

  constructor({
    ctx,
    x = 0,
    y = ctx.canvas.height,
    width = 0,
    height = ctx.canvas.height,
    color='darkcyan'
  }:constructorParamsType){
    this.ctx=ctx;
    this.current_state = {
      x:x,
      y:y,
      width:width,
      height:height,
      color:color
    }
  }
  

  readonly update = (updateParams:updateParams):barState =>{
    const {i ,frequency,neighbors,barCount} = updateParams;

    const {
      x:previous_x,
      y:previous_y,
      width:previous_width,
      height:previous_height,
      color:previous_color
    } = this.current_state

    const bottom = this.ctx.canvas.height-3;
    const canvasWidth = this.ctx.canvas.width
    
    const averageFrequency = getAverage([frequency,...neighbors]);
    const width = canvasWidth/barCount;
    const x = width*i;
    const height = bottom-(averageFrequency*0.15)
    const y = bottom;
    const color = previous_color
    
    return this.current_state = {
      x:x,
      y:y,
      width:width,
      height:height,
      color:color,
    }
  }



  readonly draw = (updateParams:updateParams):void =>{
    const freshProperties = this.update(updateParams);
    const {x,y,width,height,color} = freshProperties;
    const strokeWidth = 1;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x-strokeWidth,height,width+strokeWidth,y);
    this.ctx.fill();
    this.ctx.closePath();

  }

}

export default Bar;