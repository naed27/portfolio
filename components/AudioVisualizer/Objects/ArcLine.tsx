import { getAverage, getNeighbors} from "../../../utility/functions";

interface ConstructorParamsType{
  readonly ctx:CanvasRenderingContext2D,
  readonly startX?:number,
  readonly startY?:number,
  readonly endX?:number
  readonly endY?:number,
  readonly lineWidth?:number,
  readonly color?:string,
  readonly baseRadius:number
}

interface updateParams{
  readonly i:number,
  readonly frequency:number,
  readonly lineCount:number
}

interface ArcLineState{
  readonly startX:number,
  readonly startY:number,
  readonly endX:number,
  readonly endY:number,
  readonly color:string,
  readonly lineWidth:number,

  readonly endX2:number,
  readonly endY2:number,
}

class ArcLine{

  readonly ctx:CanvasRenderingContext2D;
  readonly BASE_RADIUS:number;
  readonly BASE_LINE_WIDTH:number;

  private current_state:ArcLineState;

  constructor({
    ctx,
    startX = 10,
    startY = 10,
    endX = 20,
    endY = 20,
    lineWidth = 2.5,
    color = 'darkcyan',
    baseRadius
  }:ConstructorParamsType){
    this.ctx=ctx;
    this.BASE_RADIUS=baseRadius;
    this.BASE_LINE_WIDTH = lineWidth;

    this.current_state={
      startX:startX,
      startY:startY,
      endX:endX,
      endY:endY,
      color:color,
      lineWidth:lineWidth,
      endX2:endX,
      endY2:endY,
    }
  }


  update = (updateParams :updateParams):ArcLineState =>{    
    const { i, frequency, lineCount } = updateParams;

    const { color:previous_color } = this.current_state

    const numberOfBars = lineCount;

    const finalHeight = frequency *0.01; //smoothened and scaled
  
    const centerX = this.ctx.canvas.width / 2;
    const centerY = this.ctx.canvas.height / 2;
    const barWidth = (Math.PI * 2) / numberOfBars;
    const lineWidth = this.BASE_LINE_WIDTH;

    const startX = centerX + Math.cos(barWidth * i) * ((this.BASE_RADIUS) + lineWidth);
    const startY = centerY + Math.sin(barWidth * i) * ((this.BASE_RADIUS) + lineWidth);
    const endX = centerX + Math.cos(barWidth * i) * ((this.BASE_RADIUS) - (finalHeight*14));
    const endY = centerY + Math.sin(barWidth * i) * ((this.BASE_RADIUS) - (finalHeight*14));
    const color = previous_color;

    const endX2 = centerX + Math.cos(barWidth * i) * ((this.BASE_RADIUS) + (finalHeight*1));
    const endY2 = centerY + Math.sin(barWidth * i) * ((this.BASE_RADIUS) + (finalHeight*1));

    return this.current_state={
      startX:startX,
      startY:startY,
      endX:endX,
      endY:endY,
      lineWidth:lineWidth,
      color:color,

      endX2:endX2,
      endY2:endY2,
    }

  }

  draw = (updateParams :updateParams) =>{
    
    const {color,lineWidth,startX,startY,endX,endY,endX2,endY2} = this.update(updateParams);

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX2, endY2);
    this.ctx.stroke();
    this.ctx.closePath();

  }



}

export default ArcLine;