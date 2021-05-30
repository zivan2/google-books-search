let express = require('express')
let mongoose = require('mongoose')
let app = express()

mongoose.connect("mongodb://localhost/books")

app.use(
    express.json(),
    express.urlencoded(),
    express.static('client/build'),
    require('./routes')
)

app.listen(8000, () => console.log('listening 👂'))