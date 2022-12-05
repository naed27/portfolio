import { useContext, memo } from "react";
import { GlobalContext } from "../../../../../Context/GlobalContext";


const HiddenSizer = () => {

  const { sizerRef } = useContext(GlobalContext);

  return (
    <div 
      ref={sizerRef}
      style={{
        visibility:'hidden',
        position:'absolute',
        top:'0',
        left:'0',
        height:'auto'
      }}
    >
    </div>
  )

}

export default memo(HiddenSizer)