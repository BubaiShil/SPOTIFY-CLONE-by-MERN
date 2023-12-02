import { createContext } from "react";

const songContext = createContext({
    currentSong:null,
    setCurrentSong:(currentSong)=>{},
    soundPlayed:null, 
    setSoundPlayled:()=>{},   
    isPaused:null, 
    setIsPaused:()=>{},

})

export default songContext;