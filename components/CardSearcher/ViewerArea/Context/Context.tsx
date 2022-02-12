import { createContext, Dispatch, SetStateAction } from 'react';
import { NotifType } from '../../Misc/globalTypes';

interface LocalViewContext{
  headerNotifs:NotifType[],
  setHeaderNotifs:Dispatch<SetStateAction<NotifType[]>>,
}

export const LocalViewContext = createContext<LocalViewContext>({
  headerNotifs:[],
  setHeaderNotifs:()=>null,
})

