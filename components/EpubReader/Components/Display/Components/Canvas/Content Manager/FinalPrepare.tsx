import Node from '../Components/Node';
import { useCallback, useContext } from 'react';
import { AdvancedEpubNode } from '../../../../../Types/Types';
import { GlobalContext } from '../../../../../Context/GlobalContext';

export default function FinalPrepare () {

  const { epub } = useContext(GlobalContext)
  
  const parseSectionPages = useCallback((pages: AdvancedEpubNode[][])=>{
    
    if( epub === null) return []
    const { images } = epub

    return pages.map((page)=>
      <>
        {page.map((nodeRefTree,i)=>{
          return (
            <Node 
              depth={1}
              images={images}
              sectionIndex={i}
              epubNode={nodeRefTree}
              key={`epub_section_${i}`}
              nodeId={`epub_section_${i}`} 
            />
          )
        })}
      </>
    )

  },[epub])

  return {parseSectionPages}
}
