import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Portal.module.scss";
import Animation from "../../Animation/Animation";
import { LayoutContext } from "../../Layout/Context/LayoutContext";
import { Unity, useUnityContext } from "react-unity-webgl";

interface Props {
  dataUrl: string,
  codeUrl: string,
  loaderUrl: string,
  frameworkUrl: string,
}

const UNITY_PLAYER_ASPECT_RATIO = 5/3;

export default function UnityPlayer ({loaderUrl, dataUrl, frameworkUrl, codeUrl}: Props) {

  const { setShowNavBar }  = useContext(LayoutContext);
  const containerRef = useRef<HTMLDivElement|null>(null);
  const [canvasHeight,setCanvasHeight] = useState(0);
  const [loadCanvas,setLoadCanvas] = useState(false);
  const [loadLock,setLoadLock] = useState(false);

  const { unityProvider, isLoaded, loadingProgression }
     = useUnityContext({ dataUrl, codeUrl, loaderUrl, frameworkUrl });
  
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
        {!isLoaded && (
          <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
        )}

        <Unity
          className={styles.canvas}
          unityProvider={unityProvider}
          style={{ 
              visibility: isLoaded ? "visible" : "hidden",
              height: loadCanvas ? `${canvasHeight}px`:`0px`
          }}
        />
        
        {loadLock&&<div>{`Your current screen size can't run the game`}</div>}

      </motion.div>
  );
};
