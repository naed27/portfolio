import animation from './Animation'
import styles from './Home.module.scss'
import Block from './Components/Block/Block'
import Button from './Components/Button/Button'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Metadata from '../Layout/Metadata/Metadata'
import { ArrowRight, ArrowLeft, Blinds } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutContext } from '../Layout/Context/LayoutContext'
import { useCallback, useContext, useEffect, useState, useRef } from 'react'
import useSwipe from '../../hooks/useSwipe'
import PreviewBox from './Components/PreviewBox/PreviewBox'

const FILL_CONTAINER_BUTTON = { width: '100%', height: '100%' };
const CIRCLE_BUTTON = { padding: '5px', borderRadius: '50%', outline: '2px solid gray', margin:'10px' }

const MENU = ['Cover', 'Card Searcher', 'Country Informer', 'Audio Visualizer', 'Phantasmora']

export default function Home () {
  const { setAbsoluteNavBar } = useContext(LayoutContext)
  const sphereRef = useRef<HTMLDivElement>(null)
  const controlTrack = useRef<HTMLDivElement>(null)
  const [menuIndex, setMenuIndex] = useState(0);

  const toggleMenuIndex = useCallback((action: '+' | '-')=>{
    if(controlTrack.current?.getAttribute('data-lock') == 'true') return
    setMenuIndex((current)=>{
      let newCurrent = 0;
      if(action == '+'){
        newCurrent = (current==MENU.length-1) ? 0 : current + 1
      }else{
        newCurrent = (current == 0) ? MENU.length-1 : current - 1
      }
      controlTrack.current?.setAttribute('data-lock','true')
      return newCurrent
    })
  },[])

  const unlockControls = useCallback(()=>controlTrack.current?.setAttribute('data-lock','false'),[])

  const queueClick = useCallback((action: '+' | '-', e: any)=>{
    controlTrack.current?.setAttribute('data-clickdown',`${e.clientX}-${e.clientY}`)
    controlTrack.current?.setAttribute('data-clickaction',`${action}`)
  },[])

  const evaluateClick = useCallback((e: any)=>{
    const prevXY = controlTrack.current?.getAttribute('data-clickdown') || 'none'
    const action = (controlTrack.current?.getAttribute('data-clickaction') as '-' | '+') || '+'
    const [x,y] = prevXY.split('-');
    const evalX = Math.abs(e.clientX-parseInt(x))
    const evalY = Math.abs(e.clientY-parseInt(y))
    if(evalX<1 && evalY <1){
      toggleMenuIndex(action)
      controlTrack.current?.setAttribute('data-clickdown',`none`)
    }
  },[toggleMenuIndex])
  
  const bind = useSwipe({
    threshold: 0.3,
    onLeft: () => toggleMenuIndex('+'),
    onRight: () => toggleMenuIndex('-'),
  });

  useEffect(()=>setAbsoluteNavBar(true), [ setAbsoluteNavBar ])

  useEffect(()=>{
    document.addEventListener('mouseup', evaluateClick)

    return () => document.removeEventListener('mouseup', evaluateClick)
  },[evaluateClick])


  return (
    <motion.div className={styles.container}
      key={'/home'}
      variants={animation}
      initial='initial'
      animate='final'
      exit='exit'>

      <Metadata
        pageTitle={`Dean - Portfolio`}
        description={`A portfolio containing all my works as a web developer!`}
      />

      <Header label='Dean'/>
        <div className={styles.sphere} ref={sphereRef} {...bind()}>
        <AnimatePresence mode='sync' key={'menu_transition'}>
          {menuIndex == 0 && <PreviewBox afterAnimation={unlockControls} key={`project_cover`} text={'P R O J E C T S'} />}
          {menuIndex == 1 && <PreviewBox afterAnimation={unlockControls} key={`project_1`} src={'https://cdn.discordapp.com/attachments/1112753458165063701/1112753476980719678/image.png'} />}
          {menuIndex == 2 && <PreviewBox afterAnimation={unlockControls} key={`project_2`} src={'https://cdn.discordapp.com/attachments/1112753458165063701/1112761535689936936/image.png'} />}
          {menuIndex == 3 && <PreviewBox afterAnimation={unlockControls} key={`project_3`} src={'https://cdn.discordapp.com/attachments/1112753458165063701/1112761209339519006/image.png'} />}
          {menuIndex == 4 && <PreviewBox afterAnimation={unlockControls} key={`project_4`} src={'https://cdn.discordapp.com/attachments/1112753458165063701/1112760858163028091/image.png'} />}
        </AnimatePresence>
          <div className={styles.controlLeft} onMouseDown={(e)=>queueClick('-',e)}/>
          <div className={styles.controlRight} onMouseDown={(e)=>queueClick('+',e)}/>
        </div>
      

      <div ref={controlTrack} data-clickdown={'none'} data-lock={'false'} data-clickaction={'none'}/>
      <Footer/>
    </motion.div>
  )
}