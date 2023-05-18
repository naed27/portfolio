import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./UnityPlayer.module.scss";
import Animation from "../../Animation/Animation";
import { LayoutContext } from "../../Layout/Context/LayoutContext";

interface Props {
  indexURL: string
}

const UNITY_PLAYER_ASPECT_RATIO = 5/3;

export default function UnityPlayer ({indexURL}: Props) {

  const { setShowNavBar }  = useContext(LayoutContext);
  const containerRef = useRef<HTMLDivElement|null>(null);
  const [canvasHeight,setCanvasHeight] = useState(0);
  const [loadCanvas,setLoadCanvas] = useState(false);
  const [loadLock,setLoadLock] = useState(false);
  
  useEffect(()=>setShowNavBar(false), [setShowNavBar])

  useEffect(()=>{

    const resizeCanvas = ()=>{
      if(!containerRef.current) return

      setLoadCanvas(false);

      const {
          offsetWidth: containerWidth,
          offsetHeight: containerHeight
      } = containerRef.current;

      if(containerWidth >= containerHeight*UNITY_PLAYER_ASPECT_RATIO){
          setCanvasHeight(containerRef.current.offsetHeight);
          setLoadCanvas(true);
          setLoadLock(false);
      }else{
          setLoadLock(true);
      }

    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    }

  },[])

  return (
      <motion.div
        className={styles.container}
        variants={Animation}
        initial="initial"
        animate="final"
        exit="exit"
        ref={containerRef}
      >
        
        <iframe 
          allowFullScreen={true}
          allow={
            `autoplay; 
            fullscreen *; 
            geolocation; 
            microphone; 
            camera; 
            midi; 
            monetization; 
            xr-spatial-tracking; gamepad; 
            gyroscope; 
            accelerometer; 
            xr; 
            cross-origin-isolated`
          }
          className={styles.iframe}
          src={indexURL} 
          title={`Phantasmora`} 
          style={{
            
            height: loadCanvas ? `${canvasHeight}px`:`0px`
          }}
        />
              
        {loadLock&&<div>{`Your current screen size can't run the game`}</div>}

      </motion.div>
  );
};
