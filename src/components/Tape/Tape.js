import Title from "./Title"
import Img from "./Img"
import File from "./File"
import PlayPause from "./PlayPause"
import Loop from "./Loop"
import Timeline from "./Timeline"
import { createContext, useState } from 'react'

export const MetadataContext = createContext(null)

function Tape(){
    const [audio, setAudio] = useState(null)
    const [title, setTitle] = useState(null)
    const [image, setImage] = useState(null)
    const [isPlay, setPlay] = useState(false)
    const [isLoop, setLoop] = useState(false)
    const values = {audio, setAudio, title, setTitle, image, setImage, isPlay, setPlay, isLoop, setLoop}

    return(
        <div>
            <MetadataContext.Provider 
                value={values}>
                    <div>
                        <h1>Tape</h1>
                    </div>
                    <Title/>
                    <Img/>
                    <File/>
                    <PlayPause/>
                    <Loop/>
                    <Timeline/>
            </MetadataContext.Provider>
        </div>
    )
}

export default Tape;