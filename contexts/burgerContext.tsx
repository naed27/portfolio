import { createContext } from "react";

interface BurgerContextData {
  burgerDisplay: boolean,
  setBurgerDisplay: React.Dispatch<React.SetStateAction<boolean>>
}

export const burgerContext = createContext<BurgerContextData>({
  burgerDisplay:false,
  setBurgerDisplay:()=>null
});

