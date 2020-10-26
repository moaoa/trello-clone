const express = require('express')
const Router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cors = require('cors')


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/redirect'
},
(accessToken, refreshToken, profile, cb) => {
    // find or create user
    // generate token 
    console.log(profile);
    return cb(null/* potintial err */, /* user  */ "userid44343434")
}))


Router.get('/google', cors(), passport.authenticate('google', { scope: ['profile']}))

Router.get('/google/redirect', cors(),
 passport.authenticate('google', {failureRedirect:'/failure', session : false}),
 (req, res) =>{
    let redirectPrefix = ''
    if(process.env.NODE_ENV !== 'production') redirectPrefix = 'http://localhost:3000'
    res.redirect(redirectPrefix + '/users/'+ req.user)
}),
 


module.exports = Router