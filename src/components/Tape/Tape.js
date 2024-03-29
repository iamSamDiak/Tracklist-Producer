import Title from "./Title"
import Img from "./Img"
import File from "./File"
import PlayPause from "./PlayPause"
import Loop from "./Loop"
import Timeline from "./Timeline"
import Circle from "./Circle"
import { createContext, useRef, useState, useEffect } from 'react'

export const MetadataContext = createContext(null)

function Tape(){
    const [audio, setAudio] = useState(null)
    const [title, setTitle] = useState(null)
    const [image, setImage] = useState(null)
    const [isPlay, setPlay] = useState(false)
    const [isLoop, setLoop] = useState(false)
    const playButton = useRef(null)
    const values = {audio, setAudio, title, setTitle, image, setImage, isPlay, setPlay, isLoop, setLoop, playButton}
    
    useEffect(() => {
        playButton.current = document.querySelectorAll(".controls-buttons button")[0]
    }, [])


    return(
        <div className="tape">
            <MetadataContext.Provider 
                value={values}>
                    <Title/>
                    <Img/>
                    <File/>
                    <div className="controls">
                        <Circle/>
                        <PlayPause/>
                        <Loop/>
                        <Circle/>
                    </div>
                    <Timeline/>
            </MetadataContext.Provider>
        </div>
    )
}

export default Tape;