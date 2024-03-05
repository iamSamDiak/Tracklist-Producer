import { useContext } from "react";
import { MetadataContext } from "./Tape.js";
import { audioContext } from "../../App.js";

const handleLoop = (context) => {
    if (context.isLoop){
        context.setLoop(false)
        audioContext.setLoop(false)
    } else {
        context.setLoop(true)
        audioContext.setLoop(true)
    }
}

function Loop(){
    const context = useContext(MetadataContext)
    return(
        <div className="controls-buttons">
            {context.isLoop ? <button onClick={() => handleLoop(context)}><div style={{backgroundImage: "url(./loop-on-track.png)"}}></div></button> : <button onClick={() => handleLoop(context)}><div style={{backgroundImage: "url(./loop.png)"}}></div></button>}
        </div>
    )
}

export default Loop;