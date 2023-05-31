import React, { useEffect} from "react";
import { useRouter }  from 'next/router'

export default function RedirectToHome() {

  const router = useRouter()

  useEffect(()=>{
    router.push('/')
  },[router])

  return <></>

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