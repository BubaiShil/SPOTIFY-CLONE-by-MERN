import { useState } from "react";
import LoggeedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {

    const [isInputFocused, setIsInputFocused] = useState(false)
    const [searchText,setSearchText] = useState("")
    const [songData, setSongData] = useState([])

    const searchSong = async()=>{
        const response = await makeAuthenticatedGETRequest("/song/get/songname/" + searchText)
        setSongData(response.data)
    }

    return (
        <LoggeedInContainer curActive="search">
            <div className="w-full py-6">
                <div className={`w-1/3 p-3 text-sm rounded-full px-5 bg-gray-900 flex text-white space-x-3 items-center 
                ${isInputFocused ?"border border-white":""}`}>
                    <Icon icon="ic:outline-search" className="text-lg "/>
                    <input type="text"
                        placeholder="What do you want to listen to?"
                        className="w-full bg-gray-900 focus:outline-none"
                        onFocus={()=>{
                            setIsInputFocused(true)
                        }}
                        onBlur={()=>{
                            setIsInputFocused(false)
                        }}    
                        value={searchText}
                        onChange={(e)=>{
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e)=>{
                            if(e.key==="Enter"){
                                searchSong();
                            }
                        }}
                    />
                </div>
                {songData.length>0?(
                <div className="pt-10 space-y-3">
                    <div className="text-white">
                    Search results for <span className="font-bold">{searchText}</span> are:
                    </div>
                    {songData.map(item=>{
                        return <SingleSongCard info={item} key={JSON.stringify(item)} playSound={()=>{}}/>
                    })}
                </div>
                ):(
                    <div className="text-white font-semibold mt-8 px-2">{`No results found :)`}</div>
                )}
            </div>
        </LoggeedInContainer>
    )
}

export default SearchPage;