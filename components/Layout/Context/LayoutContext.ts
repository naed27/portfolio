import { createContext } from "react";

interface LayoutContextData {
  showNavBar: boolean, 
  setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>,
  absoluteNavBar: boolean, 
  setAbsoluteNavBar: React.Dispatch<React.SetStateAction<boolean>>,
}

export const LayoutContext = createContext<LayoutContextData>({} as LayoutContextData);

