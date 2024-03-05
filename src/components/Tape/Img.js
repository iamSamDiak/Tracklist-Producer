import { useContext } from "react";
import { MetadataContext } from "./Tape.js";

function Img(){
    const context = useContext(MetadataContext)
    return(
        <div>
            <p>Image</p>
            {context.image ? <img width={300} src={context.image}/> : <img width={300} src="./cover.jpg"/>}
        </div>
    )
}

export default Img