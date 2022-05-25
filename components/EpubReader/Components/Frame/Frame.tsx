import styles from './Frame.module.scss';
import Canvas from './Components/Canvas/Canvas';
import { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import LoadingPage from './Components/LoadingPage/LoadingPage';

export default function Frame () {
  const frameRef = useRef(null)
  const { parsingStatus, setCanvasSize } = useContext(GlobalContext);

  useEffect(()=>{
    const canvasSizeSetter = ()=>{
      if(!frameRef.current) return
      const frameDiv = frameRef.current as HTMLDivElement
      const { clientHeight, clientWidth } = frameDiv
      setCanvasSize({height:clientHeight,width:clientWidth})
    }
    canvasSizeSetter()
    window.addEventListener('resize', canvasSizeSetter)
    return function cleanup () {
      window.removeEventListener('resize', canvasSizeSetter)
    }
  },[frameRef, setCanvasSize])

  return (
    <div ref={frameRef} className={styles.container}>
      {parsingStatus ? <LoadingPage/>: <Canvas/>}
    </div>
  )
}