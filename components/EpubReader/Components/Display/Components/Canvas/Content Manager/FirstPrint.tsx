import FinalPrepare from "./FinalPrepare"
import { EpubElements } from "../ParseEpub"
import Paginate from "../Components/Hooks/Paginate"
import { GlobalContext } from "../../../../../Context/GlobalContext"
import { memo, useContext, useEffect, useMemo, useState  } from "react"

interface Props {
  epubElements: EpubElements
}

const PRINT_RANGE_CONSTANT = 5


const FirstPrint = ({epubElements}: Props) => {

  const { sections, refTrees } = epubElements
  const { epub, setFinalJSX, setMaxPage } = useContext(GlobalContext)

  const epubSections = useMemo(()=>sections,[sections])
  
  const { paginate } = Paginate()
  const { parseSectionPages } = FinalPrepare()
  const [ hasLoaded, setHasLoaded ] = useState(false)

  const printRangePartitions = useMemo(()=>{

    const rangeConstant = PRINT_RANGE_CONSTANT
    const numberOfSections = epubSections.length
    const partitions: {start: number, end: number}[] = [];
  
    for (let i = 0; i < numberOfSections; i) {
      const gauge = i+rangeConstant
      const range = gauge<=numberOfSections ? rangeConstant : numberOfSections-i
      partitions.push({
        start: i,
        end: i+range
      })
      i = i+range
    }

    return partitions.reverse()
  },[epubSections.length])

  const [ printProgress, setPrintProgress ] = useState(0)

  useEffect(()=>{

    if( refTrees.length === 0 || epubSections.length === 0 ) return

    const progress = async () => {

      const newProgress = printRangePartitions[printRangePartitions.length-1].start
      const progressPercentage = Math.floor(((newProgress/epubSections.length)*100))
      console.log(`Progress: ${progressPercentage}%`)

      setTimeout(() => {
        setPrintProgress(newProgress)
      }, 500)
    }
    
    if(printRangePartitions.length>0){
      progress()
    }else{
      console.log(`Progress: 100%`)
    }
    
  },[ 
    epub, 
    refTrees, 
    epubSections, 
    printProgress,
    printRangePartitions,
    paginate, 
    setMaxPage,
    setFinalJSX, 
    setPrintProgress,
    parseSectionPages, 
  ])


  if(hasLoaded)
    return null

  if (printRangePartitions.length>0)
    return ( 
      <>
        {(()=>{
          const partition = printRangePartitions.pop() || {start:0,end:0}
          return sections.slice(
            partition.start,
            partition.end,
          ).map((c)=>c)
        })()}
      </> 
    )

  return null

}

export default memo(FirstPrint)