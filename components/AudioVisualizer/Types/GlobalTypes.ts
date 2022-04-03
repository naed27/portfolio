import { Dispatch, RefObject, SetStateAction } from 'react'

export interface GlobalContextType{
  readonly inputRef?: RefObject<HTMLInputElement>
  readonly containerRef?: RefObject<HTMLDivElement>
  readonly canvasRef?: RefObject<HTMLCanvasElement>
  
  readonly playButtonRef?: RefObject<HTMLDivElement>
  readonly progressLineRef?: RefObject<HTMLDivElement>

  readonly playing?: boolean
  readonly audioTitle?: string

  readonly setPlaying?: Dispatch<SetStateAction<boolean>>
  readonly setAudioTitle?: Dispatch<SetStateAction<string>>
}