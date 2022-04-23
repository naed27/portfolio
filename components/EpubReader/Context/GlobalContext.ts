import { createContext } from 'react';
import { GlobalContextType } from '../Types/GlobalTypes';

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);