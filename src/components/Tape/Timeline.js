import { useContext } from "react";
import { MetadataContext } from "./Tape.js";
import { audioContext } from "../../App.js";

let req, inputSeconds 

const setTimeline = (context) => {
    const timeline = document.querySelector(".timeline")
    timeline.value = (audioContext.currentTime/audioContext.audioDuration) * 100

    if (!audioContext.interval){
        context.setPlay(false)
        console.log('isFalse')
        cancelAnimationFrame(req)
    }

    req = requestAnimationFrame(() => setTimeline(context))
}

const handleInput = (e) => {
    console.log("on it!")
}

const handleMouseDown = () => {
    console.log("on")
    const timeline = document.querySelector(".timeline")
    const timeline2 = document.querySelector(".timeline-2")
    timeline.style.display = "none"
    timeline2.style.opacity = 1
}

const handleMouseUp = (e, context) => {
    console.log("on ittt!")
    const timeline = document.querySelector(".timeline")
    const timeline2 = document.querySelector(".timeline-2")
    const secondsSetAt = (audioContext.audioDuration) * (timeline.value/100)
    audioContext.play(secondsSetAt)
    if (!context.isPlay && audioContext.audioBuffer){
        context.setPlay(true)
    }
    //
    timeline.style.display = "block"
    timeline2.style.opacity = 0
}

function Timeline(){
    const context = useContext(MetadataContext)
    if (context.isPlay){
        req = requestAnimationFrame(() => setTimeline(context))
    } else if (!context.isPlay && req) {
        cancelAnimationFrame(req)
    }

    return(
        <div className="timeline-container">
            <input className="timeline" type="range" min="0" max="100" value="0"/>
            <input className="timeline-2" onMouseDown={handleMouseDown} onMouseUp={(e) => handleMouseUp(e, context)} onChange={handleInput} type="range" min="0" max="100"/>
        </div>
    )
}

export default Timeline;