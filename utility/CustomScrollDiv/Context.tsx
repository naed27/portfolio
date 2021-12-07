import { createContext,Dispatch,SetStateAction } from "react"; 

export interface ScrollProps {
  thumbThickness:number,
  thumbColor:string,
  thumbOpacity:number,
  trackPadding:number,
  trackColor:string,
  trackBorder:string,
  scrollBorderRadius:string,
  onHoverOnly:boolean,
}

export interface ContextProps {
  scroll:{
    Y:ScrollProps,
    X:ScrollProps
  },

  scrollableDivRef:React.RefObject<HTMLDivElement>,
  
  isHoveringOnContainer:boolean,
  setHoveringOnContainer:Dispatch<SetStateAction<boolean>>,

  isVerticalDragging:boolean, 
  setVerticalDragging: Dispatch<SetStateAction<boolean>>,
  showVerticalScrollBar:boolean,
  setShowVerticalScrollBar: Dispatch<SetStateAction<boolean>>,
  verticalScrollThumbStart:number,
  setVerticalScrollThumbStart: Dispatch<SetStateAction<number>>,
  verticalScrollThumbLength:number,
  setVerticalScrollThumbLength: Dispatch<SetStateAction<number>>,
  verticalScrollOffset:number,
  setVerticalScrollOffset: Dispatch<SetStateAction<number>>,
  verticalScrollBasePoint:number | undefined,
  setVerticalScrollBasePoint: Dispatch<SetStateAction<number | undefined>>,
  
  isHorizontalDragging:boolean, 
  setHorizontalDragging: Dispatch<SetStateAction<boolean>>,
  showHorizontalScrollBar:boolean,
  setShowHorizontalScrollBar: Dispatch<SetStateAction<boolean>>,
  horizontalScrollThumbStart:number,
  setHorizontalScrollThumbStart: Dispatch<SetStateAction<number>>,
  horizontalScrollThumbLength:number,
  setHorizontalScrollThumbLength: Dispatch<SetStateAction<number>>,
  horizontalScrollOffset:number,
  setHorizontalScrollOffset: Dispatch<SetStateAction<number>>,
  horizontalScrollBasePoint:number | undefined,
  setHorizontalScrollBasePoint: Dispatch<SetStateAction<number | undefined>>,

}

export const ScrollContext = createContext<ContextProps>({
  scroll:{
    Y: {
      thumbThickness: 0,
      thumbColor: '',
      thumbOpacity: 0,
      trackPadding: 0,
      trackColor: '',
      trackBorder: '',
      scrollBorderRadius: '',
      onHoverOnly: true,
    },
    X: {
      thumbThickness: 0,
      thumbColor: '',
      thumbOpacity: 0,
      trackPadding: 0,
      trackColor: '',
      trackBorder: '',
      scrollBorderRadius: '',
      onHoverOnly: true,
    },
  },
  scrollableDivRef:{current:null},
  isHoveringOnContainer:true,
  setHoveringOnContainer:()=>{},
  isVerticalDragging:false,
  setVerticalDragging:()=>{},
  showVerticalScrollBar:true,
  setShowVerticalScrollBar:()=>true,
  verticalScrollThumbStart:0,
  setVerticalScrollThumbStart:()=>{},
  verticalScrollThumbLength:0,
  setVerticalScrollThumbLength:()=>{},
  verticalScrollOffset:0,
  setVerticalScrollOffset:()=>{},
  verticalScrollBasePoint:0,
  setVerticalScrollBasePoint:()=>{},

  isHorizontalDragging:false,
  setHorizontalDragging:()=>false,
  showHorizontalScrollBar:true,
  setShowHorizontalScrollBar:()=>true,
  horizontalScrollThumbStart:0,
  setHorizontalScrollThumbStart:()=>0,
  horizontalScrollThumbLength:0,
  setHorizontalScrollThumbLength:()=>0,
  horizontalScrollOffset:0,
  setHorizontalScrollOffset:()=>0,
  horizontalScrollBasePoint:0,
  setHorizontalScrollBasePoint:()=>0,
});