
const animation ={
  initial:{
    opacity:0,
    y:'-100vw'
  },
  final:{
    opacity:0.7,
    y:0,
    transition:{
      opacity:{duration:1},
      y:{duration:0.8}
    }
  },
  exit:{
    opacity:0,
    y:'-100vw',
    transition:{
      opacity:{duration:1.5},
      y:{duration:1}
    }
  }
}

export default animation