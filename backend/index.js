const express = require ("express");
const mongoose = require ("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
      ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes =require("./routes/auth")
const songRoutes =require("./routes/song")
const playlistRoutes = require("./routes/playlist")
require("dotenv").config();
const cors = require("cors")
const app = express();
const port = 8000;

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://extentgr50:"+process.env.MONGO_PASSWORD+"@cluster0.ahno0dr.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then((x)=>{ 
    console.log("connected to mongo")
}).catch((err)=>{
    console.log("error")
})


     let opts = {};
     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
     opts.secretOrKey = process.env.SECRET_KEY;
     
     passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
         try {
             const user = await User.findOne({_id: jwt_payload.identifier });
     
             if (user) {
                 return done(null, user);
             } else {
                 return done(null, false);
                 // or you could create a new account
             }
         } catch (err) {
             return done(err, false);
         }
     }));
 

// let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         } 
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));

app.get("/",(req,res)=>{
     res.send("hello")
})
app.use("/auth",authRoutes)
app.use("/song",songRoutes)
app.use("/playlist",playlistRoutes)

app.listen(port,()=>{
 console.log("running")
})
