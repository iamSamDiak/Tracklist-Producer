import { useState } from "react"
import { audioContext } from "../../App.js"

function Pitch(){
    const [currentPitch, setCurrentPitch] = useState(50)
    
    const handlePitch = (e) => {
        const value = e.target.value
        setCurrentPitch(value)
        audioContext.setPitch( value / 50 )
    }

    const reset = () => {
        setCurrentPitch(50)
        audioContext.setPitch(1)
    }

    return(
        <div>
            <p>Pitch</p>
            <input type="range" className="pitch slider-effect" onChange={handlePitch} min="0" max="100" value={currentPitch}/>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default Pitch