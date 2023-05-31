import MENU from '../../../lib/Menu'
import Metadata from '../../Layout/Metadata/Metadata';
import UnityPlayer from "../Main/UnityPlayer";

export default function Phantasmora() {

  const metadata = (() => {
    const project = MENU.find((item)=>item.name === 'Phantasmora')
    return {
      img: project?.imgSrc || undefined,
      key: project?.link || '/games/phantasmora',
      title: project?.name || 'Phantasmora',
      desc: project?.name || 'A thrilling game about a ghost trapped in a dungeon!',
    }
  })()

  return (
    <>
      <Metadata
        key={metadata.key}
        pageTitle={metadata.title}
        description={metadata.desc}
        previewImage={metadata.img}
      />
      <UnityPlayer indexURL={`https://v6p9d9t4.ssl.hwcdn.net/html/7930472/index.html`}/>
    </>
  );

}