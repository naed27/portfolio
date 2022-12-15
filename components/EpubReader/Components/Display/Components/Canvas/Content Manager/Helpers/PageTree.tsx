import parse from "node-html-parser"
import Node from "../../Components/Node"
import { uniqueId } from 'lodash'
import { getLastItemOf } from "../../../../../../../../utility/functions"

export interface ShardParent {
  id: string,
  height: number,
  element: HTMLElement
}

export interface Page {
  shards: HTMLElement[],
}

interface ParentNode {
  id:string, 
  depth: number, 
  element:HTMLElement, 
  heightOffset:number,
}

interface NodeProps {
  depth: number,
  section: number,
  element: HTMLElement,
  parents: ShardParent[]
}

interface PageShard {
  depth: number,
  section: number,
  element: HTMLElement,
  parents: ShardParent[]
}

interface EpubSection {
  shards: PageShard []
}

interface Props {
  canvas: HTMLElement, 
  sections: HTMLCollection,
  sizer: HTMLElement,
}

export default class PageTreeManager {

  
  pages: HTMLElement[] = []
  canvas: HTMLElement
  sections: HTMLCollection

  epubSections: EpubSection[] = []

  heightCache = 0
  sectionCache = 0
  pageNumberCache = 0;
  pageShardCache: HTMLElement[] = []

  pageNode: Node | null = null
  previousParents: ShardParent[] = []

  previousShard?: PageShard
  currentShard?: PageShard

  pageNumber = 0;

  sizer: HTMLElement


  constructor({ canvas, sections, sizer }: Props){
    this.canvas = canvas 
    this.sections = sections
    this.sizer = sizer
  }

  cutSections = () => {
    const sections = this.sections;
    for (let i = 0; i < sections.length; i++) {
      this.epubSections.push({shards:[]})
      this.epubCutter({ 
        section: i+1,
        element: sections[i] as HTMLElement, 
        parents: [],
        depth: 0,
      })
    }
    
  }

  epubCutter = ( props: NodeProps ) => {
    const { element, section, depth, parents } = props
    const { children } = element

    if(children.length === 0) 
      return this.scoopSlice(props)
    
    const id = uniqueId(`${section}_${depth}_`)
    element.id = id
    const parent = {id, element, height:calcHeightOffset(element)}
    const newParents = [...parents, parent]

    for (let i = 0; i < children.length; i++) 
      this.epubCutter({ 
        section: section, 
        depth: depth+1, 
        parents: newParents, 
        element: children[i] as HTMLElement, 
      })
  }

  scoopSlice = ( props: NodeProps ) => {
    const { element: { parentElement }, section, depth=0, parents=[] } = props
 
    if( !parentElement || 
        parentElement.children.length>1 ||
        parentElement.id === `section_${section}`
      )
      return this.epubSections[section-1].shards.push(props)
    
    this.scoopSlice({ 
      section: section, 
      depth: depth-1, 
      parents: parents.slice(0, -1), 
      element: parentElement as HTMLElement, 
    })
  }

  paginate = () => {    
    const sections = this.epubSections

    for (let i = 0; i < 5; i++) {

      this.addPageToSizer()
      
      const { shards } = sections[i]

      for (let j = 0; j < shards.length; j++) {

        this.connect(shards[j])

      }
    }

    console.log(this.sizer)
  }

  connect = (shard: PageShard) => {

    const currentParents = shard.parents
    const previousParents = this.previousParents

    const intersections = getParentsIntersection(previousParents, currentParents)
    const differences = getParentsDifferences(currentParents, intersections)
    const shardFinal = mergeShardWithParents(shard, differences)

    if(intersections.length===0){
      const lastParentElement = 
        document.getElementById(`page_${this.pageNumber}`) || 
        this.sizer
      lastParentElement.appendChild(shardFinal)

    }else{

      const lastParentID = intersections[intersections.length-1].id
      const lastParentElement = 
        document.getElementById(`${lastParentID}_clone`) ||
        document.getElementById(`page_${this.pageNumber}`) || 
        this.sizer

      lastParentElement.appendChild(shardFinal)
    }

    this.previousParents = currentParents
  }

  checkSizer = () => {
    
  }
  
  addPageToSizer = () => {
    this.pageNumber++;
    const pageDivElement = document.createElement('div')
    pageDivElement.id = `page_${this.pageNumber}`
    this.sizer.appendChild(pageDivElement)
  }

  undoShard = () => {}
  commitShard = () => {}

  setHeightCache = (parents:ParentNode[]) => {
    this.heightCache = parents
    .reduce((total, { heightOffset }) => total + heightOffset, 0)
  }

  updateShards = (shard: PageShard) => {
    this.previousShard = this.currentShard
    this.currentShard = shard
  }


  resetPageCache = () => {
    this.heightCache = 0
    this.pageShardCache = []
  }

  commitPageCache = () => {
    if(this.pageShardCache.length===0) return


    
  }

  makeNewPage = () => {
    this.pageNumber++
  }

  isNewPage = () => {
    if(this.currentShard === undefined) return true
    if(this.previousShard === undefined) return true
    if(this.pageNumber !== this.pageNumberCache) return true
    if(this.sectionCache !== this.currentShard.section) return true
    return false
  }


}


// -----

const getParentsIntersection = (baseArray:ShardParent[], topArray:ShardParent[]): ShardParent[] => {
  return baseArray.filter(({id:baseId}) => topArray.map(({id})=>id).includes(baseId));
}

const getParentsDifferences = (baseArray:ShardParent[], topArray:ShardParent[]): ShardParent[] => {
  return baseArray.filter(({id:baseId}) => !topArray.map(({id})=>id).includes(baseId));
}

const mergeShardWithParents = (shard: PageShard, parents: ShardParent[]) => {
  let holder = shard.element.cloneNode(true) as HTMLElement
  if(parents.length>1){
    for (let i = parents.length-1; i > -1; i--) {
      const parent = parents[i].element.cloneNode(false) as HTMLElement
      parent.id = `${parents[i].id}_clone`
      parent.append(holder)
      holder = parent
    }
  }
  return holder
}

// ------ element height scale calculators

const calcShardHeight = (shard?: PageShard) => {
  if(shard === undefined) return 0
  return calcHeight(shard.element)
}

const calcHeight = (element: HTMLElement) => {
  const elementHeight = element.offsetHeight || element.clientHeight || 0
  const elementCSS = window.getComputedStyle(element)
  const elementMargins = parseFloat(elementCSS.marginTop || '0') + parseFloat(elementCSS.marginBottom || '0')
  const elementTotalHeight = elementHeight + elementMargins
  return elementTotalHeight
}

const calcHeightOffset = (element: HTMLElement) =>{
  const elementCSS = window.getComputedStyle(element)

  return (
    parseFloat(elementCSS.borderTop || '0') +
    parseFloat(elementCSS.borderBottom || '0')+
    parseFloat(elementCSS.paddingTop || '0') +
    parseFloat(elementCSS.paddingBottom || '0')
  )
}

const HtmlToJSx = (element: HTMLElement, sectionId: number, parent?: HTMLElement) => {
  const node = parse(element.outerHTML)
  return <Node node={node} id={`${sectionId}`} />
}


// ----

