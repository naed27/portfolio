import UnityPlayer from "../Main/UnityPlayer";

export default function Phantasmora() {

    return (
        <UnityPlayer 
            loaderUrl = "/Phantasmora/Build/Phantasmora.loader.js"
            dataUrl = "/Phantasmora//Build/Phantasmora.data.unityweb"
            codeUrl = "/Phantasmora//Build/Phantasmora.wasm.unityweb"
            frameworkUrl = "/Phantasmora//Build/Phantasmora.framework.js.unityweb"
        />
    );
}