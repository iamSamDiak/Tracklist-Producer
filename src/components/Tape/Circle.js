import { useContext } from "react";
import { MetadataContext } from "./Tape.js";

function Circle(){
    const context = useContext(MetadataContext)
    const animation = document.querySelectorAll(".circle")
    if (context.isPlay){
        for (const anim of animation) anim.style.animationPlayState = "running";
    } else {
        for (const anim of animation) anim.style.animationPlayState = "paused";
    }

    return(
        <div className="circle">
            <div className="circle-bar bar-1"></div>
            <div className="circle-bar bar-2"></div>
            <div className="circle-bar bar-3"></div>
        </div>
    )
}

export default Circle