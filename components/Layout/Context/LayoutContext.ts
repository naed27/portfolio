import { createContext } from "react";

interface LayoutContextData {
  address: string,
  absoluteNavBar: boolean, 
  displayBurgerMenu: boolean,
  setAddress: React.Dispatch<React.SetStateAction<string>>,
  setAbsoluteNavBar: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>,
}

export const LayoutContext = createContext<LayoutContextData>({} as LayoutContextData);

