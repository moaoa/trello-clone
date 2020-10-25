if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const passport = require('passport')
const express = require('express')
const app = express()
const port  = process.env.PORT || 5000

app.use(passport.initialize())

const GoogleStrategy = require('passport-google-oauth20').Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/redirect'
},
(accessToken, refreshToken, profile, cb) => {
    // find or create user
    // generate token 
    return cb(null/* potintial err */, /* user  */ {userName: 'moaad', email: 'email.com', id: 'userid'})
}))

app.get('/auth/google', passport.authenticate('google', {scope: ['profile'] }) )

app.get('/auth/google/redirect', passport.authenticate('google', {failureRedirect: '/', session: false}), (req, res) => {
    res.redirect('http://localhost:3000/users/' + req.user.id)
})

app.listen(port , () => console.log('server running on port : ', port))