import MENU from '../../lib/Menu'
import animation from './Animation'
import { v4 as uuidv4 } from 'uuid'
import styles from './Home.module.scss'
import useSwipe from '../../hooks/useSwipe'
import Header from './Components/Header/Header'
import Sphere from './Components/Sphere/Sphere'
import Metadata from '../Layout/Metadata/Metadata'
import InfoBar from './Components/InfoBar/InfoBar'
import { AnimatePresence, motion } from 'framer-motion'
import PreviewBox from './Components/PreviewBox/PreviewBox'
import { useOnLoadImages } from '../../hooks/useOnLoadImages'
import PreviewInfo from './Components/PreviewInfo/PreviewInfo'
import { LayoutContext } from '../Layout/Context/LayoutContext'
import { useCallback, useContext, useEffect, useState, useRef } from 'react'


export default function Home () {
  const { setAbsoluteNavBar, setShowNavBar } = useContext(LayoutContext)
  const [menuIndex, setMenuIndex] = useState(0)
  const controlTrack = useRef<HTMLDivElement>(null)
  const imageStoreRef = useRef<HTMLDivElement>(null)
  const imagesLoaded = useOnLoadImages(imageStoreRef)

  const toggleMenuIndex = useCallback((action: '+' | '-')=>{
    if(controlTrack.current?.getAttribute('data-lock')=='true') return
    setMenuIndex((current)=>{
      if(controlTrack.current?.getAttribute('data-lock') == 'true')
        controlTrack.current?.setAttribute('data-lock','false')
      if(action == '+')
        return (current==MENU.length-1) ? 0 : current + 1 
      return (current == 0) ? MENU.length-1 : current - 1
    })
  },[])

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
    onRight: () => toggleMenuIndex('-')
  });

  useEffect(()=>{
    setShowNavBar(false)
  }, [ setAbsoluteNavBar, setShowNavBar ])

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
      <AnimatePresence mode='wait'>
        {imagesLoaded?<Header label='Dean' key={`header1`}/>:<Header label='' key={`header0`}/>}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        {imagesLoaded?
          <Sphere reactGestureBinder={bind} key={`sphere1`}>
            <AnimatePresence mode='sync'>
              {menuIndex == 0 && <PreviewBox  key={`${uuidv4()}`} text={'P R O J E C T S'} />}
              {menuIndex == 1 && <PreviewBox  key={`${uuidv4()}`} src={MENU[1].imgSrc} />}
              {menuIndex == 2 && <PreviewBox  key={`${uuidv4()}`} src={MENU[2].imgSrc} />}
              {menuIndex == 3 && <PreviewBox  key={`${uuidv4()}`} src={MENU[3].imgSrc} />}
              {menuIndex == 4 && <PreviewBox  key={`${uuidv4()}`} src={MENU[4].imgSrc} />}
            </AnimatePresence>
            <div className={styles.controls}>
              <div className={styles.controlLeft} onMouseDown={(e)=>queueClick('-',e)}/>
              <div className={styles.controlRight} onMouseDown={(e)=>queueClick('+',e)}/>
            </div>
          </Sphere>
          :
          <Sphere cssStyle={{border: '2px solid transparent'}}  key={`sphere0`}>
            {'Setting up...'}
          </Sphere>
        }
      </AnimatePresence>
      
      <div ref={controlTrack} data-clickdown={'none'} data-lock={'false'} data-clickaction={'none'}/>

      {imagesLoaded==false&&<div className={styles.imageCache} ref={imageStoreRef}>
        <img src={MENU[1].imgSrc} alt={'imageCache1'} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
        <img src={MENU[2].imgSrc} alt={'imageCache2'} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
        <img src={MENU[3].imgSrc} alt={'imageCache3'} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
        <img src={MENU[4].imgSrc} alt={'imageCache4'} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
      </div>}

    <AnimatePresence mode='wait'>
    {imagesLoaded?
      <InfoBar key={`infobar1`}>
        <AnimatePresence mode='sync'>
          {menuIndex == 0 && <PreviewInfo menuItem={MENU[0]} key={`${uuidv4()}`} isLink={false}/>}
          {menuIndex == 1 && <PreviewInfo menuItem={MENU[1]} key={`${uuidv4()}`} isLink={true}/>}
          {menuIndex == 2 && <PreviewInfo menuItem={MENU[2]} key={`${uuidv4()}`} isLink={true}/>}
          {menuIndex == 3 && <PreviewInfo menuItem={MENU[3]} key={`${uuidv4()}`} isLink={true}/>}
          {menuIndex == 4 && <PreviewInfo menuItem={MENU[4]} key={`${uuidv4()}`} isLink={true}/>}
        </AnimatePresence>
      </InfoBar>:
      <InfoBar key={'infobar0'}/>}
    </AnimatePresence>
      
    </motion.div>
  )
}