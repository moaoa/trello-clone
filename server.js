if(process.env.NODE_ENV !== 'production') require('dotenv').config()
const passport = require('passport')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port  = process.env.PORT || 5000
const mongoose =  require('mongoose')
const cors = require('cors')
const io = require('socket.io')(server)
const db_url = process.env.DB_URL


// io 
io.on('connection', (socket) => {
    console.log('user connected');
})




app.get('/', (req, res) => {
    res.send('hello')
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


/*

ccess to XMLHttpRequest at 'http://localhost:5000/socket.io/?EIO=3&transport=polling&t=NN-b-bN' from origin 'http://localhost:3000' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.


*/