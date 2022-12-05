import { useContext } from "react"
import { GlobalContext } from "../../../../../../Context/GlobalContext"
import PageTreeManager from "./PageTree"

interface Props {
  sizer: HTMLElement,
  canvas: HTMLElement, 
  focusedElement: HTMLElement, 
}

export const Paginate = ({focusedElement, canvas, sizer}: Props) => {


  const sections = focusedElement.children

  if(sections.length===0) return


  const pageTreeManager = new PageTreeManager({canvas,sections,sizer})

  pageTreeManager.cutSections()
  pageTreeManager.paginate()
}



