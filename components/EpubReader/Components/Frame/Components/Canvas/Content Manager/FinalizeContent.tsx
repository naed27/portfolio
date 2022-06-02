import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../../../Context/GlobalContext';

export default function FinalizeContent () {

  const { canvasRef, parsingStatus } = useContext(GlobalContext)

  useEffect(()=>{
    console.log('loaded')
    if(!canvasRef.current)return
    const canvas = canvasRef.current as HTMLDivElement

    const onLoad = () =>{
      console.log('hey i loaded')
    }

    canvas.addEventListener('load',onLoad)

    return function cleanup() {
      canvas.removeEventListener('load',onLoad)
    } 

  },[canvasRef,parsingStatus])

  return {canvasRef}
}