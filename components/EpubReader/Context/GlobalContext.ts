import { createContext, Dispatch, SetStateAction } from 'react';

export interface GlobalContextType {
  showChapters: boolean, 
  showBookInfo: boolean, 
  showSettings: boolean,
  showFileManager: boolean,
  showNavBarContents: boolean,
  
  toggleChapters: Dispatch<SetStateAction<boolean>>,
  toggleBookInfo: Dispatch<SetStateAction<boolean>>,
  toggleSettings: Dispatch<SetStateAction<boolean>>,
  toggleFileManager: Dispatch<SetStateAction<boolean>>,
  toggleNavBarContents: Dispatch<SetStateAction<boolean>>,
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);