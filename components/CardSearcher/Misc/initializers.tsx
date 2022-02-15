import { Query } from './globalTypes';

export const initialQuery: Query = {
  name:'',
  desc:'',
  keywords:'',
  type:'',
  subtype:'',
  race:'',
  attribute:'',
  atk:{ min:-1, max:-1 },
  def:{ min:-1, max:-1 },
  level:{ min:-1, max:-1 },
  limit: -1,
  cardGame:'T.C.G.',
}

export const initializeHolders = ( size: number )=>{
  const holder = [];
  for(let i=0;i<size;i++){
    holder.push(null);
  }
  return holder;
}

