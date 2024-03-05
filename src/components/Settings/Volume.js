import { useState } from "react"
import { audioContext } from "../../App.js"
import { createPortal } from "react-dom"

function Volume(){
    const [currentVolume, setCurrentVolume] = useState(100)
    
    const handleVolume = (e) => {
        const value = e.target.value
        setCurrentVolume(value)
        audioContext.setVolume( value / 100 )
    }

    const reset = () => {
        setCurrentVolume(100)
        audioContext.setVolume(1)
    }

    return(
        <div>
            <p>Volume</p>
            <input type="range" className="volume" onChange={handleVolume} min="0" max="100" value={currentVolume}/>
            <button onClick={reset}>Réinitialiser</button>
        </div>
    )
}

export default Volume