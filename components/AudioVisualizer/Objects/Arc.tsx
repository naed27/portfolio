interface ArcParams{
  readonly ctx:CanvasRenderingContext2D,
  readonly x?:number,
  readonly y?:number,
  readonly radius?:number,
  readonly startAngle?:number,
  readonly endAngle?:number,
  readonly color?:string,
}

interface updateParams{
  readonly averageFrequency:number,
  readonly showStats?:boolean,
  readonly changeColor?:boolean
}

interface arcState{
  readonly x:number,
  readonly y:number,
  readonly color:string,
  readonly radius:number,
  readonly startAngle:number,
  readonly endAngle:number,
  readonly impact:number,
}

class Arc{

  readonly ctx:CanvasRenderingContext2D;

  readonly BASE_RADIUS:number;
  readonly BASE_START_ANGLE:number;
  readonly BASE_END_ANGLE:number;
  readonly BASE_COLOR:string;
  readonly BASE_IMPACT:number;

  previous_state:arcState;

  constructor({
    ctx,
    x=ctx.canvas.width/2,
    y=ctx.canvas.height/2,
    radius=20,
    startAngle = 0,
    endAngle = Math.PI*2,
    color='darkcyan'
  }:ArcParams){
    this.ctx=ctx;
    this.BASE_RADIUS=radius;
    this.BASE_START_ANGLE=startAngle;
    this.BASE_END_ANGLE=endAngle;
    this.BASE_COLOR=color;
    this.BASE_IMPACT=0;
    this.previous_state = {
      x:x,
      y:y,
      color:color,
      radius:radius,
      startAngle:startAngle,
      endAngle:endAngle,
      impact:0,
    }
  }

  readonly showStats = (msg:string) =>{
    
    const x = this.ctx.canvas.width/2;

    this.ctx.beginPath()
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(msg, x, 50);
    this.ctx.fill();
    this.ctx.closePath();
  }

  readonly update = ({averageFrequency,showStats=false}:updateParams):arcState =>{

    const {
      x:previous_x,
      y:previous_y,
      color:previous_color,
      radius:previous_radius,
      startAngle:previous_startAngle,
      endAngle:previous_endAngle,
      impact:previous_impact,
    } = this.previous_state

    const x = this.ctx.canvas.width/2
    const y = this.ctx.canvas.height/2
    const startAngle = previous_startAngle
    const endAngle = previous_endAngle
    const impact = averageFrequency*0.015;
    const radius = this.BASE_RADIUS+impact;

    let color = previous_color

    if(showStats)
      this.showStats(`${Math.floor(averageFrequency)}`);


    return {
      x:x,
      y:y,
      color:color,
      radius:radius,
      startAngle:startAngle,
      endAngle:endAngle,
      impact:impact,
    }
  }

  readonly draw = (updateParams:updateParams):void =>{

    const freshProperties = this.update(updateParams);
    const {x,y,color,radius,startAngle,endAngle} = freshProperties;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x,y,radius,startAngle,endAngle);
    this.ctx.fill();
    this.ctx.closePath();

    this.updatePreviousState(freshProperties);
  }

  readonly updatePreviousState=(currentState:arcState)=>{
    return this.previous_state=currentState;
  }

}

export default Arc;