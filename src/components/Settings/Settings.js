import Volume from "./Volume"
import Reverb from "./Reverb"
import Pitch from "./Pitch"
import Lowpass from "./Lowpass"

import { createContext, useState } from 'react'

export const Context = createContext(null)

function Settings(){
    return(
        <div>
            <Volume/>
            <Reverb/>
            <Pitch/>
            <Lowpass/>
        </div>
    )
}

export default Settings