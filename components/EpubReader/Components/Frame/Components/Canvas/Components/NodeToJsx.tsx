import { HTMLElement } from "node-html-parser";
import { KeyValuePairs } from "../../../../../Context/GlobalContext";
import EpubImage from "./EpubImage";
import { Layout } from "./Layout";

export interface Props {
  nodeId: string,
  node: HTMLElement,
  images: KeyValuePairs
}

export default function NodeToJsx ({nodeId, node, images} : Props) {

  const { rawTagName, rawText } = node

  if(rawTagName === 'image' || rawTagName === 'img')
    return <EpubImage node={ node } images={ images }/>

  if(node.childNodes.length>0)
    return (
      <Layout node={node}>
          {node.childNodes.map((child,i)=>(
            <NodeToJsx 
              key={ `${nodeId}_${i}` } 
              nodeId={ `${nodeId}_${i}` } 
              node={ child as HTMLElement }
              images={images}
            />
          ))}
      </Layout>
    )

  return (
    <Layout node={node}>{rawText&&rawText}</Layout>
  )
  
}