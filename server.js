if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const express = require('express')
const app = express()
const port  = process.env.PORT || 5000
const mongoose =  require('mongoose')

app.use(passport.initialize())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

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

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
    ).then(res => console.log('db connected: ', !!res))
    .catch(console.log)

app.use('/auth', require('./routes/auth'))
app.use('/projects', require('./routes/projects'))


app.listen(port , () => console.log('server running on port : ', port))
