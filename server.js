let express = require('express')
let mongoose = require('mongoose')
let app = express()
let dotenv = require('dotenv').config()
let path = require('path')

const PORT = process.env.PORT || 3001

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_ADMIN_PASSWORD}@cluster0.ljlhu.mongodb.net/books?retryWrites=true&w=majority`)


app.use(
    express.json(),
    express.urlencoded(),
    require('./routes')
)

if (process.env.NODE_ENV == 'production') app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})
 
app.listen(PORT, () => console.log('listening 👂'))