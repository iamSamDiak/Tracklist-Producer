import { useContext } from "react";
import { MetadataContext } from "./Tape.js";

function Img(){
    const context = useContext(MetadataContext)
    return(
        <div className="image-container">
            {context.image ? <div className="image" style={{ backgroundImage: `url(${context.image}` }}></div> : <div className="image" style={{ backgroundImage: "url(./cover.jpg)" }}></div>}
        </div>
    )
}

export default Img