import { parse } from "node-html-parser"
import { Page } from "../../../../../../Types/Types"
import Node from "../../Components/Node"

interface Props {
  canvas: HTMLElement, 
  focusedElement: HTMLElement, 
}

export const Paginate = ({focusedElement, canvas}: Props) => {

  const { children } = focusedElement
  const canvasHeight = canvas.clientHeight

  const pageTree: Page[] = []
  const testLog: any[] = []
  const sectionArray: HTMLElement[] = []

  for (let i = 0; i < children.length; i++) {

    const sectionId = i+1

    let shards: JSX.Element[] = []
    let shardHeights = []
    let accumulatedHeight = 0;

    const wrapper = children[i] as HTMLElement;
    const section = wrapper.children[0] as HTMLElement;
    sectionArray.push(section)

    const parent = section.outerHTML

    const { children: sectionChildren } = section
    for (let j = 0; j < sectionChildren.length; j++) {
      const piece = sectionChildren[j] as HTMLElement
      const pieceHeight = calculateHeight(piece)
      accumulatedHeight += pieceHeight
      const node = parse(piece.outerHTML)
      const jsx = <Node node={node} id={`node_${i}`} />
      shardHeights.push({pieceHeight, element: piece})

      if(accumulatedHeight<=canvasHeight){

        //push
        shards.push(jsx)

      }else{

        // commit
        if(shards.length>0){
          pageTree.push({ sectionId, shards:[...shards], parent }) 
          testLog.push({ shardHeights, totalHeight: accumulatedHeight-pieceHeight  }) 
        }

        // set as initial
        shards = [jsx]
        accumulatedHeight = pieceHeight

      }
    }
    if(shards.length>0)
      pageTree.push({ sectionId, shards:[...shards], parent }) 
      testLog.push({ shardHeights, totalHeight: accumulatedHeight  }) 
  }

  console.log(sectionArray)


  return pageTree

}

const calculateHeight = (element: HTMLElement) => {
  const elementHeight = element.offsetHeight || element.clientHeight || 0
  const elementCSS = window.getComputedStyle(element)
  const elementMargins = parseFloat(elementCSS.marginTop || '0') + parseFloat(elementCSS.marginBottom || '0')
  const elementTotalHeight = elementHeight + elementMargins
  return elementTotalHeight
}