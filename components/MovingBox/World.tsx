import Player from "./Objects/Player";

const world:Function = (canvasRef:any,containerRef:any)=>{

  //setup canvas and context
  const offset = -2;
  if (containerRef.current === null||canvasRef.current === null) return
  const container:HTMLDivElement = containerRef.current
  const canvas:HTMLCanvasElement = canvasRef.current
  canvas.width=container.offsetWidth+offset;
  canvas.height=container.offsetHeight+offset;
  const c = canvas.getContext('2d');
  if(c===null)return


  // generate player
  const player = new Player(c)

  // setup how to render everything
  let animationFrameId:number;
  const render = () => {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    player.draw();
    animationFrameId = window.requestAnimationFrame(render)
  }

  // clean the render when its not used
  const cleanRender = ()=>{
    window.cancelAnimationFrame(animationFrameId);
  }

  // execute setup and render
  player.setupControls();
  render();

  // cleaners
  return [
    player.cleanControls,
    cleanRender
  ]
}

export default world

























// export function canvas(canvasRef:any){
//   if (canvasRef.current === null) return
//     const canvas:HTMLCanvasElement = canvasRef.current
//     const context = canvas.getContext('2d');
//     let frameCount = 0
//     let animationFrameId:any
//     const render = () => {
//       frameCount++;
//       if(context===null)return
//       c.clearRect(0, 0, c.canvas.width, c.canvas.height)
//       c.fillStyle = '#000000'
//       c.beginPath()
//       c.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 6)
//       c.fill()
//       animationFrameId = window.requestAnimationFrame(render)
//     }
//     render()
//     return () => {
//       window.cancelAnimationFrame(animationFrameId)
//     }
// }