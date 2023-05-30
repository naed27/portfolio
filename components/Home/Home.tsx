import animation from './Animation'
import styles from './Home.module.scss'
import useSwipe from '../../hooks/useSwipe'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Metadata from '../Layout/Metadata/Metadata'
import { AnimatePresence, motion } from 'framer-motion'
import PreviewBox from './Components/PreviewBox/PreviewBox'
import { useOnLoadImages } from '../../hooks/useOnLoadImages'
import { LayoutContext } from '../Layout/Context/LayoutContext'
import { useCallback, useContext, useEffect, useState, useRef } from 'react'
import { Dna } from 'react-loader-spinner'
import Sphere from './Components/Sphere/Sphere'

const MENU = 
[
  {index: -1, name: 'Cover', imgSrc:''},
  {index: 0, name: 'Card Searcher', imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112753476980719678/image.png'},
  {index: 1, name: 'Country Informer', imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112761535689936936/image.png'},
  {index: 2, name: 'Audio Visualizer', imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112761209339519006/image.png'},
  {index: 3, name: 'Phantasmora', imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112760858163028091/image.png'},
]

export default function Home () {
  const { setAbsoluteNavBar } = useContext(LayoutContext)
  const [menuIndex, setMenuIndex] = useState(0)
  const controlTrack = useRef<HTMLDivElement>(null)
  const imageStoreRef = useRef<HTMLDivElement>(null)
  const imagesLoaded = useOnLoadImages(imageStoreRef)
  
  const toggleMenuIndex = useCallback((action: '+' | '-')=>{
    setMenuIndex((current)=>{
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

      <Header label='Dean' key={'header1'}/>
      <AnimatePresence mode='wait'>
          {imagesLoaded?
            <Sphere reactGestureBinder={bind} key={'sphere1'}>
              <AnimatePresence mode='sync' key={'menu_transition'}>
                {menuIndex == 0 && <PreviewBox  key={`project_cover`} text={'P R O J E C T S'} />}
                {menuIndex == 1 && <PreviewBox  key={`project_1`} src={MENU[1].imgSrc} />}
                {menuIndex == 2 && <PreviewBox  key={`project_2`} src={MENU[2].imgSrc} />}
                {menuIndex == 3 && <PreviewBox  key={`project_3`} src={MENU[3].imgSrc} />}
                {menuIndex == 4 && <PreviewBox  key={`project_4`} src={MENU[4].imgSrc} />}
              </AnimatePresence>
              <div className={styles.controlLeft} onMouseDown={(e)=>queueClick('-',e)}/>
              <div className={styles.controlRight} onMouseDown={(e)=>queueClick('+',e)}/>
            </Sphere>
            :
            <Sphere cssStyle={{border: '2px solid transparent'}}  key={'sphere2'}>
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{border:'2px solid transparent'}}
                wrapperClass={styles.sphere}/>
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
      <Footer/>
    </motion.div>
  )
}