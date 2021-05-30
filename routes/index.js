let express = require('express')
let rt = express.Router()
let path = require('path')
let booksController = require('../controller')

rt.get('/',  (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')))

rt
.get('/books', booksController.findById)
.post('/books', booksController.create)

module.exports = rt