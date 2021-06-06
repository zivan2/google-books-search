let express = require('express')
let rt = express.Router()
let path = require('path')
let booksController = require('../controller')

rt
.get('/books', booksController.findById)
.post('/books', booksController.create)

rt.get('/booksall', booksController.findAll)

module.exports = rt