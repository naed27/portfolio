
const animation ={
  initial:{
    opacity:0,
  },
  final:{
    opacity:1,
    transition:{
      opacity:{duration:0.1,
        ease:"easeIn"
      },
    }
  },
  exit:{
    opacity:0,
    transition:{
      opacity:{duration:0.1,
        ease:"easeOut"
      }
    }
  }
}

export default animation