import Node from '../Components/Node';
import { useCallback, useContext } from 'react';
import { AdvancedEpubNode } from '../../../../../Types/Types';
import { GlobalContext } from '../../../../../Context/GlobalContext';

export default function FinalPrepare () {

  const { epub } = useContext(GlobalContext)
  
  const parseSectionPages = useCallback((pages: AdvancedEpubNode[][])=>{
    
    if( epub === null) return []

    return pages.map((page)=>
      <>
        {page.map((nodeRefTree,i)=>{
          return (
            <Node 
              key={`epub_section_${i}`}
              id={`epub_section_${i}`} 
              node={nodeRefTree.node}
            />
          )
        })}
      </>
    )

  },[epub])

  return {parseSectionPages}
}
