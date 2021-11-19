import { randomIntBetween } from "../../../utility/functions";

class Player{
  x:number;
  y:number;
  moveUp:boolean=false;
  moveDown:boolean=false;
  moveRight:boolean=false;
  moveLeft:boolean=false;
  speed:number=4;
  c:CanvasRenderingContext2D;
  width:number=100;
  height:number=100;
  canvasWidthLimit:number;
  canvasHeightLimit:number;

  constructor(context:CanvasRenderingContext2D){
    this.x=randomIntBetween(0+this.width,context.canvas.width-this.width)
    this.y=randomIntBetween(0+this.height,context.canvas.height-this.height)
    this.c = context;
    this.canvasHeightLimit=context.canvas.height-this.height;
    this.canvasWidthLimit=context.canvas.width-this.width;
  }

  displayCoordinates = () =>{
    this.c.beginPath()
    this.c.font = "10px";
    this.c.fillStyle = "white";
    this.c.textAlign = "center";
    this.c.fillText(`x: ${this.x} y: ${this.y}`, this.x+(this.width/2), this.y+(this.height/2));
    this.c.fill();
    this.c.closePath();
  }

  update = () =>{
    if(this.moveUp&&this.y>0)this.y-=this.speed;
    if(this.moveDown&&this.y<this.canvasHeightLimit)this.y+=this.speed;
    if(this.moveLeft&&this.x>0)this.x-=this.speed;
    if(this.moveRight&&this.x<this.canvasWidthLimit)this.x+=this.speed;
  }

  draw = () =>{
    
    this.update();
    
    this.c.beginPath()
    this.c.fillStyle = 'black'
    this.c.fillRect(this.x,this.y,this.width,this.height);
    this.c.fill();
    this.c.closePath();
    this.displayCoordinates();
  }

  keyDownHandler = ({key}:KeyboardEvent) =>{
    switch(key){
      case 'w': if(!this.moveUp)this.moveUp=true;
        break;
      case 'a': if(!this.moveLeft)this.moveLeft=true;
        break;
      case 's': if(!this.moveDown)this.moveDown=true;
        break;
      case 'd': if(!this.moveRight)this.moveRight=true;
        break;
      default:
        break
    }
  }

  keyUpHandler = ({key}:KeyboardEvent) =>{
    switch(key){
      case 'w': this.moveUp=false;
        break;
      case 'a': this.moveLeft=false;
        break;
      case 's': this.moveDown=false;
        break;
      case 'd': this.moveRight=false;
        break;
      default:
        break
    }
  }

  setupControls = () =>{
    window.addEventListener('keydown',this.keyDownHandler);
    window.addEventListener('keyup',this.keyUpHandler);
  }

  cleanControls = () =>{
    window.removeEventListener('keydown',this.keyDownHandler);
    window.removeEventListener('keyup',this.keyUpHandler);
  }
}

export default Player;