const express = require("express");
const router = express.Router();
const passport = require("passport")
const Song = require("../models/Song")
const User = require("../models/User")


router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, thumbnail, track } = req.body;
    
    if (!name || !thumbnail || !track) {
        return res.status(400).json({ err: "Insufficient details to create song" });
    }
    
    const artist = req.user._id; // here we are taking the user objectID and putting it in artist
    const songDetails = { name, thumbnail, track, artist };
    
    try {
        const createdSong = await Song.create(songDetails);
        return res.status(200).json(createdSong);
    } catch (error) {
        return res.status(500).json({ err: "An error occurred while creating the song" });
    }
});
router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {

         const songs = await Song.find({ artist: req.user._id }).populate("artist");//here artistID = userID,,,(artist should match with model artist name)
         // artist: req.user._id  this basically means aristid(NOT ARTIST'S objectID) = userobjectID  FROM THIS CRITERIA IT WILL GET THE SONGS OF THE USER OR ARTIST
         return res
             .status(200) 
             .json({ data: songs })

})


router.get("/get/artist/:artistId", passport.authenticate ("jwt", { session: false }), async (req, res) =>{
    const {artistId}= req.params;//-- FROM THIS WE ARE ABLE TO GET aristid(NOT ARTIST'S objectID) AND STORING IT IN {artistId}
    const artist = await User.findOne({ _id : artistId});// _id : artistId-- HERE WE ARE CHECKING BOTH ID MATCHES OR NOT
    //![]=false,!null=true,!undefined=true
    if(!artist){
       return res 
        .status(301)
        .json({err:"user does'nt exist"})
    }
    const songs = await Song.find({artist: artistId});//artist: artistId--HERE WE ARE PUTTING aristid(NOT ARTIST'S objectID) IN artist variable TO GET SONG OF PARTICULAR ARTIST
    return res
    .status(200) 
    .json({ data: songs })
})

router.get("/get/songname/:songName",passport.authenticate ("jwt", { session: false }), async (req, res)=>{
    const {songName}= req.params;
   
    const songs = await Song.find({name:songName }).populate("artist"); //-- HERE WE ARE CHECKING BOTH ID MATCHES OR NOT
    return res
    .status(200) 
    .json({ data: songs })
})
module.exports = router;





//const { name, thumbnail, track } = req.body;
// if (!name || !thumbnail || !track) {
//     return res.status(301).json({ err: "Insufficient details to create song" })
//  }
//  const artist = req.user._id;
//  const songDetails = { name, thumbnail, track, artist }
  
//      const createdSong = await Song.create(songDetails)
//      return res.status(200)
//      .json(createdSong)




// get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {

//     const songs = await Song.find({ artist: req.user._id });

//     return res
//         .status(200)
//         .json({ data: songs })