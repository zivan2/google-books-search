let express = require('express')
let mongoose = require('mongoose')
let app = express()
let dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3000

mongoose.connect("mongodb+srv://admin:hmGosaFTktuZboLe@cluster0.ljlhu.mongodb.net/hikingpro?retryWrites=true&w=majority")

if (process.env.NODE_ENV == 'production') express.static('client/build')

app.use(
    express.json(),
    express.urlencoded(),
    require('./routes')
)

app.listen(PORT, () => console.log('listening 👂'))