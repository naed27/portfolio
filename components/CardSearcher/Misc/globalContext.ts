import { createContext } from 'react';
import { GlobalContextType } from './globalTypes';

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);