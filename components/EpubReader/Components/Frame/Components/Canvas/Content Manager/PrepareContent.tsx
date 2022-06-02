import { parse } from 'node-html-parser';
import { useEffect, useState, useContext, useCallback } from 'react';
import { GlobalContext } from '../../../../../Context/GlobalContext';
import { createFileStorage, createStyleElements } from '../../../../../Functions/Functions';
import NodeToJsx from '../Components/NodeToJsx';


export default function PrepareContent () {
  const {epub, canvasRef, setMaxPage, setCurrentPage} = useContext(GlobalContext)
  const [styleElements, setStyleElements] = useState<JSX.Element[]>([])
  const [chaptersJSX,setChaptersJSX] = useState<JSX.Element[]>([])

  const generateChapterSet = useCallback(()=>{
    const {chapters, resources} = epub
    if(chapters.length === 0) return []

    const { images, styles } = createFileStorage(resources);
    const stylesJSX = createStyleElements(styles)
    setStyleElements(stylesJSX)
    setMaxPage(chapters.length-1)

    const chapterDivs = chapters.map(({rawText},i)=>{
      const node = parse(rawText)
      return <NodeToJsx 
        key={`${i}`}
        nodeId={`${i}`} 
        node={node} 
        images={images}
        />
    })

    return chapterDivs

  },[epub, setMaxPage])

  useEffect(()=>{
    if(canvasRef.current===null) return
    
    setMaxPage(0)
    setCurrentPage(0)

    setChaptersJSX( generateChapterSet() )

  },[canvasRef, generateChapterSet, setMaxPage, setCurrentPage])

  return {chaptersJSX, styleElements}
}