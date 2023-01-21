import { createContext } from 'react';
import { GlobalContextType } from '../Types/types';

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);