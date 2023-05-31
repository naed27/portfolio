import React, { useCallback, useEffect} from "react";
import { motion } from "framer-motion";
import styles from "./Portal.module.scss";
import { useRouter }  from 'next/router'
import Animation from "../../Animation/Animation";

export default function Portal() {

  const router = useRouter()

  useEffect(()=>{
    router.push('/')
  },[router])

  // const openPageInNewTab = useCallback((gameName: string)=> {
  //   window.open(`${window.location.pathname}/${gameName}`, "_blank");
  // },[])

  // return (
  //   <motion.div
  //     className={styles.container}
  //     variants={Animation}
  //     initial="initial"
  //     animate="final"
  //     exit="exit"
  //   >
  //     <div className={styles.item} onClick={()=>openPageInNewTab('phantasmora')}> PHANTASMORA </div>
  //   </motion.div>
  // );
}