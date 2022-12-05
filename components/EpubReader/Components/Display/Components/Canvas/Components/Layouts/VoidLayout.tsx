import { memo } from "react"

interface Props {
  children?: any
}

const VoidLayout = ({children}:Props) => {
  return (<>{children}</>)
}

export default memo(VoidLayout)