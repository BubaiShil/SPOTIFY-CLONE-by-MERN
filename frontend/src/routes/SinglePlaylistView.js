import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggeedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";


const SinglePlaylistView = () => {
    const [playlistDetails, setPlaylistDetails] = useState({})
    const { playlistId } = useParams()

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/" + playlistId)
            setPlaylistDetails(response.playlist)
             //console.log(response)
            // console.log(playlistDetails)
        }
        getData();
    }, [])

    return (
        <LoggeedInContainer curActive={"library"}>
         {playlistDetails._id && (
            <div>
                <div className="text-white text-xl pt-8 font-semibold">
                    {playlistDetails.name}
                    
                </div>
                <div className="pt-10 space-y-3">
                    {playlistDetails.songs.map((item) => {
                        return (
                            <SingleSongCard
                                info={item}
                                key={JSON.stringify(item)}
                                playSound={() => {}}
                            />
                        );
                    })}
                </div>
                
            </div>
            
         )} 
        </LoggeedInContainer>
    )
}

export default SinglePlaylistView;







