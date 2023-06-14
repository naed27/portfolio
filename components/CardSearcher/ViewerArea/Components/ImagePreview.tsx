import { YGOCard } from "../../Misc/globalTypes"
import Image from 'next/image'
import { memo, useState } from "react"

interface Props{
  card:YGOCard,
  showImages?:boolean,
}

function ImagePreview({card, showImages}:Props) {
  return (
    <>
      {(showImages&&card)&&(
      <img 
      src={`${card.card_images[0].image_url}`}  
      alt={`${card.name}'s_image`} 
      style={{
        width: `100%`,
        height:'100%',
        objectFit: 'contain'
      }}/>
      )}
    </>
  )
}


export default memo(ImagePreview)