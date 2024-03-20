import { useContext } from "react";
import { MetadataContext } from "./Tape.js";
import { audioContext } from "../../App.js";
var jsmediatags = window.jsmediatags;

const dataToURL = (data, format) => {
    const charArray = [...data].map(charCode => String.fromCharCode(charCode));
    const charString = charArray.join('');
    const base64String = btoa(charString);
    const blob = new Blob([Uint8Array.from(atob(base64String), c => c.charCodeAt(0))], { type: format });
    const blobURL = URL.createObjectURL(blob);
    return blobURL;
}

const handleFile = async (e, context) => {
    const file = await e.target.files[0]
    if (!file) return

    const url_audio = URL.createObjectURL(file)
    context.setAudio(url_audio)
    jsmediatags.read(file, {
        onSuccess: async function(tag) {
            const title = tag.tags.title ? `${tag.tags.title} - ${tag.tags.artist}` : file.name
            if (tag.tags.title){
                const { data, format } = tag.tags.picture;
                const url_picture = dataToURL(data, format)
                context.setImage(url_picture)
            } else {
                context.setImage(null)
            }

            context.setTitle("Chargement...")
            context.playButton.current.classList.add("disable")
            context.playButton.current.disabled = true
            await audioContext.getArrayBuffer(url_audio)
            setTimeout(() => {
                context.playButton.current.classList.remove("disable")
                context.playButton.current.disabled = false
                context.setTitle(title)
            }, 1000)

        },
        onError: function(error) {
          console.log(error.type, error.info);
        }
    });

    context.setPlay(false)

    try {
        audioContext.stop()
    } catch (e) {}

}

function File(){
    const context = useContext(MetadataContext)

    return(
        <div className="import-audio-file">
            <input type="file" onChange={(e) => handleFile(e, context)} accept="audio/mp3" />
        </div>
    )
}

export default File;