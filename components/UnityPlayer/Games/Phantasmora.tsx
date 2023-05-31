import Metadata from '../../Layout/Metadata/Metadata';
import UnityPlayer from "../Main/UnityPlayer";


export default function Phantasmora() {

  return (
    <>
      <Metadata
        key={'/games/phantasmora'}
        pageTitle={'Phantasmora'}
        description={'A thrilling game about a ghost trapped in a dungeon!'}
        previewImage={'https://cdn.discordapp.com/attachments/1112753458165063701/1112760858163028091/image.png'}
      />
      <UnityPlayer indexURL={`https://v6p9d9t4.ssl.hwcdn.net/html/7930472/index.html`}/>
    </>
  );

}