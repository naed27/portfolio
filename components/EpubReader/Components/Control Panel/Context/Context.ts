import { createContext, Dispatch, SetStateAction } from 'react';

export interface ControlPanelContextType { 
  showPanel: boolean 
  setShowPanel: Dispatch<SetStateAction<boolean>>
}

export const ControlPanelContext = createContext<ControlPanelContextType>({} as ControlPanelContextType);