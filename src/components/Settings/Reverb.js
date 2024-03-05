import { useState } from "react"
import { audioContext } from "../../App.js"

function Reverb(){
    const [currentReverb, setCurrentReverb] = useState(0)
    
    const handleReverb = (e) => {
        const value = e.target.value
        setCurrentReverb(value)
        audioContext.setReverb( value / 100 )
    }

    const reset = () => {
        setCurrentReverb(0)
        audioContext.setReverb(0)
    }

    return(
        <div>
            <p>Reverb</p>
            <input type="range" className="reverb" onChange={handleReverb} min="0" max="100" value={currentReverb}/>
            <button onClick={reset}>Réinitialiser</button>
        </div>
    )
}

export default Reverb