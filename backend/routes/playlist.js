const express = require("express");
const passport = require("passport")
const Playlist= require("../models/Playlist")
const User = require("../models/User")
const Song = require("../models/Song")

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser= req.user;
    const {name,thumbnail,songs}= req.body;
    if(!name || !thumbnail|| !songs){
        res
        .status(301)
        .json({err:"insufficient data"})
    }
    const playlistData={name,thumbnail,songs, owner: currentUser._id,collaborators:[],}
    const playlist = await Playlist.create(playlistData);
    res
    .status(200)
    .json({playlist}); //{}
})

// router.get("/get/playlist/:playlistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
//     const playlistId = req.params.playlistId;

//     try {
//         const playlist = await Playlist.findById(playlistId)
//             .populate({
//                 path: 'songs',
//                 populate: {
//                     path: 'artist',
//                 }
//             })
//             .exec();

//         if (!playlist) {
//             console.error('Playlist not found');
//             return res.status(404).json({ err: "Playlist not found" });
//         }

//         if (!playlist.songs || playlist.songs.length === 0) {
//             console.error('No songs found in the playlist');
//             return res.status(404).json({ err: "No songs found in the playlist" });
//         }

//         console.log('Fetched Playlist:', playlist);
//         console.log('Populated Songs:', playlist.songs);

//         res.status(200).json({ playlist });
//     } catch (error) {
//         console.error("Error fetching playlist:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });





router.get("/get/playlist/:playlistId", passport.authenticate("jwt", { session: false }), async (req, res) =>{
    const playlistId = req.params.playlistId; // HERE WE ARE GETTING PLAYLIST'S objectID AND PUTTING IT IN A VARIABLE playlistId
    const playlist = await Playlist.findOne({_id:playlistId}).populate( {path:'songs',populate:{path:'artist'}})// TO CHECK PLAYLIST'S OBJECTID MATCHES WITH req.params.playlistId AS IT IS COMMING FROM BODY 
    //console.log(artist)
    if(!playlist){
        res
        .status(301)
        .json({err: "Invalid ID"})
    }
    res
    .status(200)
    .json({playlist});//{}
})

router.get("/get/me", passport.authenticate("jwt", { session: false }), async (req, res) =>{
    const artistId= req.user._id;
    
    const playlists= await Playlist.find({owner : artistId}).populate('owner')
    res
    .status(200)
    .json({data:playlists});
})

router.get("/get/artist/:artistId", passport.authenticate("jwt", { session: false }), async (req, res) =>{
    const artistId= req.params.artistId;
    const artist = await User.findOne({_id:artistId})
    if(!artist){
        res
        .status(301)
        .json({err: "Invalid artist ID"})
    }
    const playlists= await Playlist.find({owner : artistId})
    res
    .status(200)
    .json({data:playlists});
})

router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res)=>{
    const currentUser= req.user;
    const {playlistId,songId}= req.body;
    const playlist = await Playlist.findOne({_id:playlistId});
    if(!playlist){
        res
        .status(304)
        .json({err: "Invalid ID"})
    }
    if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
        res
        .status(400)
        .json({err: "NOT ALLOWED"})
    }

    const song = await Song.findOne({_id: songId});
    if(!song){
        res
        .status(301)
        .json({err: "song not exits"})
    }

    playlist.songs.push(songId);
    await playlist.save();
    res
    .status(200)
    .json({playlist}); //{}
})


module.exports = router;