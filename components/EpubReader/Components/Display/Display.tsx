import styles from './Display.module.scss';
import Canvas from './Components/Canvas/Canvas';
import { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import LoadingPage from './Components/LoadingPage/LoadingPage';

export default function Display () {
  const ref = useRef(null)
  const { parsingStatus, canvasPreferences, setCanvasSize } = useContext(GlobalContext);

  useEffect(()=>{
    const canvasSizeSetter = ()=>{
      if(!ref.current) return
      const { padding } = canvasPreferences
      const { clientHeight, clientWidth } = ref.current as HTMLDivElement
      const width = `${(clientWidth-(padding*2))}px`;
      const height = `${(clientHeight-(padding*2))}px`;
      setCanvasSize({ width, height })
    }
    canvasSizeSetter()
    window.addEventListener('resize', canvasSizeSetter)
    return function cleanup () {
      window.removeEventListener('resize', canvasSizeSetter)
    }
  },[ref, setCanvasSize, canvasPreferences])

  return (
    <div ref={ref} className={styles.container}>
      {parsingStatus ? <LoadingPage/>: <Canvas/>}
    </div>
  )
}