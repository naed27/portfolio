import { createContext } from 'react';
import { GlobalContextType } from '../Types/Types';



export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);