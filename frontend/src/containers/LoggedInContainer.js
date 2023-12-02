import { useContext, useState,useLayoutEffect, useRef } from "react"
import { Howl } from "howler"
import Spotify_logo from "../assets/images/spotify_logo.svg"
import IconText from "../components/shared/IconText"
import { Icon } from "@iconify/react"
import TextWithHover from "../components/shared/TextWithHover"
import songContext from "../contexts/songContext"
import CreatePlaylistModal from "../modals/CreatePlaylistModal"
import AddToPlaylistModal from "../modals/AddToPlaylistModal"
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers"
import { useNavigate } from "react-router-dom"


const LoggeedInContainer = ({ children,curActive }) => {

    const [CreatePlaylistModalOpen,setCreatePlaylistModalOpen] = useState(false)
    const [addToPlaylistModalOpen,setAddToPlaylistModalOpen] = useState(false)

    const { currentSong, setCurrentSong ,soundPlayed,setSoundPlayled,isPaused,setIsPaused} = useContext(songContext)

    const firstUpdate = useRef(true)

    useLayoutEffect(()=>{
        if(firstUpdate.current){
            firstUpdate.current = false;
            return;
        }
        if(!currentSong){
            return;
        }
        changeSong(currentSong.track)
    },[currentSong && currentSong.track])

    const addSongToPlaylist = async (playlistId)=>{
        const songId = currentSong._id 

        const payload = {playlistId,songId}
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song",payload)
        if(response._id){
            setAddToPlaylistModalOpen(false)
        }
    }

    const playSound = ()=>{
        if(!soundPlayed){
            return;
        }
        soundPlayed.play();
    }

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop()
        }

        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayled(sound);
        sound.play()
        setIsPaused(false);
    }

    const pauseSound = () => {
        soundPlayed.pause();
    }

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false)
        }
        else {
            pauseSound();
            setIsPaused(true)
        }
    }
    const navigate = useNavigate()
    return (
        <div className="h-full w-full bg-app-black ">

            {CreatePlaylistModalOpen && (<CreatePlaylistModal closeModal={()=>{
                setCreatePlaylistModalOpen(false)
            }}/>
            )}

            {addToPlaylistModalOpen && (<AddToPlaylistModal closeModal={()=>{
                setAddToPlaylistModalOpen(false)
            }}
            addSongToPlaylist={addSongToPlaylist}
            />
            )}

            <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                    <div>
                        <div className="p-6">
                            <img src={Spotify_logo} alt="spotify logo" width={125} />
                        </div>
                        <div className="py-5">
                            <IconText iconName={"material-symbols:home"} displayText={"Home"} active={curActive==="home"} targetLink={"/home"} />
                            <IconText iconName={"material-symbols:search"} displayText={"Search"} active={curActive==="search"} targetLink={"/search"}/>
                            <IconText iconName={"fluent:library-16-filled"} displayText={"Library"} active={curActive==="library"} targetLink={"/library"}/>
                            <IconText iconName={"mdi:music-box"} displayText={"My Music"} active={curActive==="myMusic"} targetLink={"/myMusic"} />
                        </div>
                        <div className="pt-5">
                            <IconText iconName={"icon-park-solid:add"} displayText={"Create Playlist"} onClick={()=>{setCreatePlaylistModalOpen(true)}}/>
                            <IconText iconName={"bxs:heart-square"} displayText={"Liked Songs"}  />
                        </div>
                    </div>
                    <div className="px-5 ">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="akar-icons:globe" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div>
                        </div>
                    </div>
                </div>



                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-1/2 border-r border-white">

                                </div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                                <div className="" onClick={()=>{navigate("/uploadSong")}}>
                                <TextWithHover displayText={"Upload Song"} />
                                </div>
                                <div className="bg-white w-10 h-10 rounded-full font-semibold p-2 flex items-center justify-center cursor-pointer">
                                    AC
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {
                currentSong && (

                <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
                    <div className="w-1/4 flex items-start">
                        <img src={currentSong.thumbnail}
                            alt="currentSongThumbnail"
                            className="h-14 w-14 rounded-full" />

                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">{currentSong.name}</div>
                            <div className="text-xs text-gray-500  hover:underline cursor-pointer">{currentSong.artist.firstName + " "+ currentSong.artist.lastName}</div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">

                            <Icon icon="ph:shuffle-fill" fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />

                            <Icon icon="material-symbols:skip-previous-outline" fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />

                            <Icon icon={
                                isPaused
                                    ? "ic:baseline-play-circle"
                                    : "zondicons:pause-solid"
                            } fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause} />

                            <Icon icon="material-symbols:skip-next-outline" fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />

                            <Icon icon="ic:twotone-repeat" fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />

                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon icon="ic:round-playlist-add" fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={()=>{
                                setAddToPlaylistModalOpen(true)
                            }}/>
                        <Icon icon="ph:heart-bold" fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"/>
                    </div>
                </div>
            )}
        </div>
    )
}




export default LoggeedInContainer;