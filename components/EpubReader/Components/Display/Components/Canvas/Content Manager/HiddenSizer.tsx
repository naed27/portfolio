import { useContext, memo } from "react";
import { GlobalContext } from "../../../../../Context/GlobalContext";


const HiddenSizer = () => {

  const { sizerRef } = useContext(GlobalContext);

  return (
    <div ref={sizerRef}/>
  )

}

export default memo(HiddenSizer)