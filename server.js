if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const passport = require('passport')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port  = process.env.PORT || 5000
const mongoose =  require('mongoose')
const io = require('socket.io')(server)
const db_url = process.env.DB_URL

const onlineUsers = {}

// io connection and disconnection
io.on('connection', (socket) => {
    onlineUsers[socket.handshake.query.auth] = socket

    socket.on('disconnect', () => {
        if(socket.handshake.query && onlineUsers[socket.handshake.query.auth]) delete onlineUsers[socket.handshake.query.auth]
    })
})


app.use(passport.initialize())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
    
if(process.env.NODE_ENV !== 'production') {
    let morgan = require('morgan')
    app.use(morgan('tiny'))
}


mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
    ).then(res => console.log('db connected: ', !!res))
    .catch(console.log)

app.use('/auth', require('./routes/auth'))
app.use('/projects', require('./routes/projects'))


server.listen(port , () => console.log('server running on port : ', port))

module.exports.onlineUsers = onlineUsers