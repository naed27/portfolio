import animation from "./Animation";
import { motion } from 'framer-motion';
import styles from './ViewerArea.module.scss';
import type { Country } from "../Types/types";
import { GlobalContext } from "../Context/context";
import { useContext, useState, useRef } from "react";
import InfoSheet from "./Components/InfoSheet/InfoSheet";
import InfoCanvas from "./Components/InfoCanvas/InfoCanvas";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import CountryName from "./Components/InfoCanvas/Components/CountryName/CountryName";
import CountryImage from "./Components/InfoCanvas/Components/CountryImage/CountryImage";
import CanvasToggler from "./Components/InfoCanvas/Components/CanvasToggler/CanvasToggler";
import GoogleMap from "./Components/InfoCanvas/Components/GoogleMap/GoogleMap";



function ViewCardArea({country}:{country:Country}) {

  const { setSelectedCountry } = useContext(GlobalContext);

  const [toggleCanvas, setToggleCanvas] = useState<'map'|'flag'>('flag');

  const modalRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(modalRef, () => setSelectedCountry && setSelectedCountry(null));

  return (
    <motion.div 
    className={styles.backdrop}
    variants={animation}
    initial='initial'
    animate='final'
    exit='exit'
    >
      <div className={styles.container} ref={modalRef}>

        <InfoCanvas>
          <CountryName country={country}/>
          <GoogleMap country={country} viewState={toggleCanvas}/>
          <CountryImage country={country} viewState={toggleCanvas}/>
          <CanvasToggler toggleCallback={setToggleCanvas} viewState={toggleCanvas}/>
        </InfoCanvas>

        <InfoSheet country={country}/>

      </div>
    </motion.div>
  )
}

export default ViewCardArea



