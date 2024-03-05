import { useContext } from "react";
import { MetadataContext } from "./Tape.js";

function Title(){
    const context = useContext(MetadataContext)
    return(
        <div><p>{ context.title ? context.title : "Aucun titre"}</p></div>
    )
}

export default Title;