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
        <div>
            {context.isLoop ? <button onClick={() => handleLoop(context)}>Loop Off</button> : <button onClick={() => handleLoop(context)}>Loop On</button>}
        </div>
    )
}

export default Loop;