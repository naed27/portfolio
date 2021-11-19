import { YGOCard, Query } from "./Types";

const Initializer = () =>{

  const initialQuery = ():Query=>({
    name:'',
    desc:'',
    type:'',
    subtype:'',
    level:{min:-1,max:-1},
    atk:{min:-1,max:-1},
    def:{min:-1,max:-1},
    race:'',
    attribute:'',
  })

  return {
    initialQuery
  }
}

export default Initializer;