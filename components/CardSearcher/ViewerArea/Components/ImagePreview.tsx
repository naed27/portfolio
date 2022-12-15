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
      {(showImages&&card)&&(<Image 
          src={card.card_images[0].image_url} 
          alt='card image'
          layout='fill'
          objectFit='contain'
          unoptimized
          key={card.id}
      />)}
    </>
  )
}


export default memo(ImagePreview)