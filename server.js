if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const express = require('express')
const app = express()
const cors = require('cors')
const port  = process.env.PORT || 5000

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/redirect'
},
(accessToken, refreshToken, profile, cb) => {
    // find or create user
    // generate token 
    return cb(null/* potintial err */, /* user  */ "userid44343434")
}))

app.get('/auth/google', cors(), passport.authenticate('google', {scope: ['profile'] }) )

app.get('/auth/google/redirect',cors(), passport.authenticate('google', {failureRedirect: '/', session: false}), (req, res) => {
    let redirectPrefix = ''
    if(process.env.NODE_ENV !== "production") redirectPrefix = "http://localhost:3000"
    res.redirect(redirectPrefix + '/users/' + req.user)
})

app.listen(port , () => console.log('server running on port : ', port))