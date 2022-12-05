import { memo, useContext, useEffect, useMemo, useRef } from "react"
import { GlobalContext } from "../../../../../Context/GlobalContext"
import { Page } from "../../../../../Types/Types"

interface Props {
  pages: Page[]
}

const FinalHTML = ({ pages }: Props) => {

  const { currentPage } = useContext(GlobalContext)
  const ref = useRef<HTMLDivElement>(null)
  const Pages = useMemo(()=>pages,[pages])

  if (Pages.length>0)
    return (
      <div ref={ref}>
        {Pages[currentPage].shards.map((jsx,i)=><div key={`shard_${i}`}>{jsx}</div>)}
      </div>
    )

  return null
}

export default memo(FinalHTML)