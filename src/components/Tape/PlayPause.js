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
        <div className="controls-buttons">
            {context.isPlay ? <button onClick={() => handlePlayPause(context)}><div style={{backgroundImage: "url(./pause.png)"}}></div></button> : <button onClick={() => handlePlayPause(context)}><div style={{backgroundImage: "url(./play.png)"}}></div></button>}
        </div>
    )
}

export default PlayPause;