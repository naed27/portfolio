import { KeyValuePairs } from "../../../../../../Types/Types";

const FLEXBOX_CENTER_STYLE = 'display:flex;align-items:center;justify-content:center'

interface Props {
  canvas: HTMLElement, 
  focusedElement: HTMLElement, 
}

const paddingHeight = 5;
const paddingStyle = `padding-block: ${paddingHeight}px`;
const svgStyle = `border:1px solid #ecdc8d;background-color:#ecdc8d`;

const ScaleImages = ({focusedElement, canvas}: Props) => {

  const { children } = focusedElement

  for (let i = 0; i < children.length; i++) {
    const element = children[i] as HTMLElement;
    const { localName: tag } = element

    if(element.children.length>0){
      ScaleImages({ canvas, focusedElement: element })
      continue
    }

    if( tag === 'img' || tag === 'image' )
      scale({ canvas, image: element as HTMLImageElement })

  }
  
}


// --------------- Scale Functions for <svg> <image> <img> elements

interface SubProps {
  canvas: HTMLElement,
  image: HTMLImageElement
}

const scale = ({image, canvas}: SubProps) => {

  const { clientWidth: canvasWidth, clientHeight: canvasHeight} = canvas

  const imageWidth = image.naturalWidth || parseInt(image.getAttribute('width')||'0')
  const imageHeight = image.naturalHeight || parseInt(image.getAttribute('height')||'0')

  const imgRatio = imageHeight / imageWidth
  const canvasRatio = canvasHeight / canvasWidth  
  
  if(imgRatio < canvasRatio)
    scaleImageFromWidth({image, imageWidth, canvasWidth})
  else
    scaleImageFromHeight({image, imageHeight, canvasHeight})

  if(image.localName === 'image'){
    image.parentElement?.parentElement?.setAttribute('style',FLEXBOX_CENTER_STYLE)
  }

}

interface WidthScalerProps {
  imageWidth: number,
  canvasWidth: number, 
  image :HTMLImageElement|null, 
}

interface HeightScalerProps {
  imageHeight: number,
  canvasHeight: number, 
  image :HTMLImageElement|null, 
}


const scaleImageFromWidth = ({image, imageWidth, canvasWidth}: WidthScalerProps) => {
  const widthStyle = `${(imageWidth <= canvasWidth) ? imageWidth : canvasWidth}px`

  if(image?.localName === 'img'){
    image?.parentElement?.setAttribute('style',`${paddingStyle}; margin:0px`)
    image?.setAttribute('width',widthStyle)
    image?.setAttribute('height',`auto`)
  }

  if(image?.localName === 'image'){
    image?.parentElement?.setAttribute('height',`auto`)
    image?.parentElement?.setAttribute('style',svgStyle)
    image?.parentElement?.setAttribute('width',widthStyle)
  }
}

const scaleImageFromHeight = ({image, imageHeight, canvasHeight}: HeightScalerProps) => {
  const heightStyle = `${(imageHeight <= canvasHeight) ? imageHeight : canvasHeight}px`
  
  if(image?.localName === 'img'){
    image?.parentElement?.setAttribute('style',`height: ${heightStyle};${paddingStyle}; margin:0px`)
    image?.setAttribute('width',`auto`)
    image?.setAttribute('height',`100%`)
  }
  
  if(image?.localName === 'image'){
    image?.parentElement?.setAttribute('width',`auto`)
    image?.parentElement?.setAttribute('style',svgStyle)
    image?.parentElement?.setAttribute('height',heightStyle)
  }
}

export default ScaleImages



