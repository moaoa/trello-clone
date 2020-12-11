const express = require('express')
const Router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cors = require('cors')
const User = require('../modals/User')
const generateToken = require('../utils/generateToken')
const GoogleUser = require('../modals/GoogleUser')
const bcrypt = require('bcrypt')
const pullProps = require('../utils/pullProps')
const authMiddleware = require('../middleware/authMiddleware')


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/redirect'
},
    async (accessToken, refreshToken, profile, cb) => {
        const { id, photos, displayName } = profile
        let user = await GoogleUser.findById(profile.id)
        if (!user) {
            user = new GoogleUser({ _id: id, imgUrl: photos[0].value, name: displayName, email })
            await user.save()
        }
        const token = generateToken({ _id: user._id })
        return cb(null/* potintial err */, /* user  */token)
    }))


Router.get('/google', cors(), passport.authenticate('google', { scope: ['profile'] }))

Router.get('/google/redirect', cors(),
    passport.authenticate('google', { failureRedirect: '/failure', session: false }),
    (req, res) => {
        let redirectPrefix = ''
        if (process.env.NODE_ENV !== 'production') redirectPrefix = 'http://localhost:3000'
        res.redirect(redirectPrefix + `?token=${req.user}`)
    }),


    Router.post('/signUp', cors(), async (req, res) => {
        const { email, password, name, imgUrl } = req.body
        if (!email || !password || !name) return res.status(400).json({ msg: 'all fields are required' })

        try {
            const user = await User.findOne({ email })
            if (user) return res.status(400).json({ msg: 'email already exists' })

            const hashedPassword = await bcrypt.hash(password + '', 10)
            const newUser = new User({ email, password: hashedPassword, name, imgUrl })
            await newUser.save()
            const userProps = pullProps(newUser, ['name', 'email', 'imgUrl', '_id', 'invitations'])
            const token = generateToken({ _id: newUser._id })
            res.status(201).json({
                user: {
                    ...userProps,
                    token
                }
            })
        } catch (error) {
            res.status(500).send()
            console.log(error);
        }


    })

Router.post('/signIn', cors(), async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ msg: 'all fields are required' })

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ msg: 'email or password is wrong' })

        const match = await bcrypt.compare(password + '', user.password)
        if (match) {
            const token = generateToken({ _id: user._id })
            const userProps = pullProps(user, ['name', 'email', 'imgUrl', '_id', 'invitations'])
            res.json({ user: { token, ...userProps } })
        } else {
            res.status(401).json({ msg: 'email or password is wrong' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
})
Router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await GoogleUser.findById(req.user._id)
        const token = generateToken({_id: user._id})
        const userProps = {...pullProps(user, ['name', 'email', 'imgUrl']) , token}
        res.json({ user: userProps})
    } catch (error) {
        res.status(500)
    }
})
module.exports = Router