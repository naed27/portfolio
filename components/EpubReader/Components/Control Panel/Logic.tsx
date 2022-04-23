import { useState, useEffect, useRef, useContext } from "react";
import { ControlPanelContextType } from "./Context/Context";

export default function Logic() {
  
  const [showPanel,setShowPanel] = useState(false);
  
  const ControlPanelValues: ControlPanelContextType = {
    showPanel,
    setShowPanel
  }

  return {ControlPanelValues}
}