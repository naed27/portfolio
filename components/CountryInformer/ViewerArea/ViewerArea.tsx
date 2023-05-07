import { Country } from "../Types/types";
import styles from './ViewerArea.module.scss';
import { GlobalContext } from "../Context/context";
import { useContext, useRef, useState } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import {motion} from 'framer-motion';
import animation from "./Animation";
import Name from "./Components/Name/Name";
import Header from "./Components/Header/Header";
import CountryImage from "./Components/CountryImage/CountryImage";



function ViewCardArea({country}:{country:Country}) {

  const { setSelectedCountry } = useContext(GlobalContext);

  const modalRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(modalRef, () => setSelectedCountry && setSelectedCountry(null));

  return (
    <motion.div className={styles.backdrop}
    variants={animation}
    initial='initial'
    animate='final'
    exit='exit'
    >
      <div className={styles.container} ref={modalRef}>
        <Header>
          <Name country={country}/>
          <CountryImage country={country}/>
        </Header>
      </div>
    </motion.div>
  )
}

export default ViewCardArea
