import Spotify_logo from "../assets/images/spotify_logo.svg"
import IconText from "../components/shared/IconText"
import { Icon } from "@iconify/react"
import TextWithHover from "../components/shared/TextWithHover"


const focusCardsData = [
    {
        title:"Peaceful Piano",
        description:"Relax and indulge with beautiful piano pieces",
        imgUrl:"https://images.unsplash.com/photo-1638805316372-e4e91cbf3ee1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29uZ3MlMjBiZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, 
    {
        title:"Deep Focus",
        description:"Keep calm and focus with music",
        imgUrl:"https://images.unsplash.com/photo-1463421585849-6b0acf2c9257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvY3VzJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        title:"Instrumental Study",
        description:"Focus with soft study music in the background.",
        imgUrl:"https://images.unsplash.com/photo-1445743432342-eac500ce72b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {   title:"Focus Flow",
        description:"Up tempo instrumental hip hop beats",
        imgUrl:"https://images.unsplash.com/photo-1474692295473-66ba4d54e0d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1568&q=80"

    },
    {
        title:"Beats to think to",
        description:"Focus with deep techno and tech house",
        imgUrl:"https://images.unsplash.com/photo-1586972246803-d2bdc4006378?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }];

const Home = () => {
    return (
        <div className="h-full w-full flex">
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                <div>
                    <div className="p-6">
                        <img src={Spotify_logo} alt="spotify logo" width={125} />
                    </div>
                    <div className="py-5">
                        <IconText iconName={"material-symbols:home"} displayText={"Home"} active />
                        <IconText iconName={"material-symbols:search"} displayText={"Search"} />
                        <IconText iconName={"fluent:library-16-filled"} displayText={"Library"} />
                    </div>
                    <div className="pt-5">
                        <IconText iconName={"icon-park-solid:add"} displayText={"Create Playlist"} />
                        <IconText iconName={"bxs:heart-square"} displayText={"Liked Songs"} />
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
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white">

                            </div>
                        </div>
                        <div className="w-2/5 flex justify-around h-full items-center">
                        
                            <TextWithHover displayText={"Sign up"} />
                            <div className="bg-white h-2/3 rounded-full font-semibold px-8 flex items-center justify-center cursor-pointer">
                                Log in
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content p-8 pt-0 overflow-auto">
                    <PlaylistView titleText="Focus" cardsData={focusCardsData} />
                    <PlaylistView titleText="Spotfy Playlists" cardsData={focusCardsData} />
                    <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
                </div>
            </div>
        </div>
    )
}

const PlaylistView = ({ titleText, cardsData }) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full flex justify-between  space-x-4">
                {
                    cardsData.map((item) => {
                        return (
                        <Card title={item.title}
                            description={item.description}
                            imgUrl={item.imgUrl} />
                        )
                    })
                }
               
            </div>
        </div>
    )
}

const Card = ({ title, description, imgUrl }) => {
    return (
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white +
             font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    )
}

export default Home;