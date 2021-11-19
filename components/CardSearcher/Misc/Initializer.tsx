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

  const initializeHolders = (size:number)=>{
    const holder = [];
    for(let i=0;i<size;i++){
      holder.push(null);
    }
    return holder;
  }

  return {
    initialQuery,
    initializeHolders
  }
}

export default Initializer;