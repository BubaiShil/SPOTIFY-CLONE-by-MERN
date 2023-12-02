import { useState, useEffect } from "react"
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"


const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {

    const [myPlaylists, setMyPlaylists] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/me"
            )
            setMyPlaylists(response.data)
            //console.log(response.data)
        }
        getData();
    }, [])

    return (
        <div className="absolute bg-gray-300 w-screen h-screen bg-opacity-40 flex justify-center items-center " onClick={closeModal}>
            <div className="bg-app-black w-1/3 rounded-md p-8" onClick={(e) => { e.stopPropagation() }}>
                <div className="text-white mb-5 font-semibold text-lg">Select Playlist</div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <div className="">
                        {myPlaylists.map((item) => {  //()
                            return (
                            <PlaylistComponent info={item} addSongToPlaylist={addSongToPlaylist} 
                            />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const PlaylistComponent = ({ info, addSongToPlaylist }) => {
    return (
        <div className="bg-app-black w-full flex items-center space-x-3 mt-3 hover:bg-gray-800 bg-opacity-40 cursor-pointer p-3" onClick={() => {
            addSongToPlaylist(info._id)
        }}>
            <div className="">
                <img src={info.thumbnail} className="w-10 h-10 rounded" alt="thumbnail" />
            </div>
            <div className="text-white font-semibold text-sm ">
                {info.name}
            </div>
        </div>
    )
}

export default AddToPlaylistModal;