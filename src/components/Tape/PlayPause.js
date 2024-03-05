import { useContext } from "react";
import { MetadataContext } from "./Tape.js";
import { audioContext } from "../../App.js";

const handlePlayPause = (context) => {
    if (!audioContext.audioBuffer) return

    if (!context.isPlay){
        // est en pause
        context.setPlay(true)
        audioContext.play(audioContext.currentTime)
    } else {
        // est en marche
        context.setPlay(false)
        audioContext.stop()
    }
}

function PlayPause(){
    const context = useContext(MetadataContext)
    return(
        <div>
            {context.isPlay ? <button onClick={() => handlePlayPause(context)}>Pause</button> : <button onClick={() => handlePlayPause(context)}>Play</button>}
        </div>
    )
}

export default PlayPause;