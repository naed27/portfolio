import AudioManager from '../Logic/AudioManager'
import { Dispatch, RefObject, SetStateAction } from 'react'

export interface GlobalContextType{
  readonly inputRef?: RefObject<HTMLInputElement>
  readonly containerRef?: RefObject<HTMLDivElement>
  readonly canvasRef?: RefObject<HTMLCanvasElement>
  
  readonly playButtonRef?: RefObject<HTMLDivElement>
  readonly progressBarRef?: RefObject<HTMLDivElement>
  readonly progressLineRef?: RefObject<HTMLDivElement>

  readonly audioDurationRef?: RefObject<HTMLDivElement>
  readonly audioCurrentTimeRef?: RefObject<HTMLDivElement>
  readonly audioTrackSliderPointRef?: RefObject<HTMLDivElement>
  readonly audioTrackSliderProgressRef?: RefObject<HTMLDivElement>
  readonly audioTrackSliderContainerRef?: RefObject<HTMLDivElement>

  readonly audioTitle?: string | null
  readonly audioPlayingStatus?: boolean

  readonly setAudioTitle?: Dispatch<SetStateAction<string | null>>
  readonly setAudioPlayingStatus?: Dispatch<SetStateAction<boolean>>
}