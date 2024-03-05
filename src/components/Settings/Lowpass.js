import { useState } from "react"
import { audioContext } from "../../App.js"

function Lowpass(){
    const [currentLowpass, setCurrentLowpass] = useState(0)
    
    const handleLowpass = (e) => {
        const value = e.target.value
        setCurrentLowpass(value)
        console.log(value)
        audioContext.setLowpass(value)
    }

    const reset = () => {
        setCurrentLowpass(0)
        audioContext.setLowpass(0)
    }

    return(
        <div>
            <p>Lowpass</p>
            <input type="range" className="lowpass" onChange={handleLowpass} min="0" max="100" value={currentLowpass}/>
            <button onClick={reset}>Réinitialiser</button>
        </div>
    )
}

export default Lowpass