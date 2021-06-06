const { Book } = require('../models')

module.exports = {
  findAll: function(req, res) {
    Book
      .find({})
      .then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err =>{
        console.log(err)
        res.status(422).json(err)
      });
  },
  findById: function(req, res) {
    Book
      .find(req.query)
      .then(dbModel => {
        if (dbModel.length > 0) {
          res.status(200).json(dbModel)
        } else {
          res.status(404).json({message: 'No books found.'})
        }
      })
      .catch(err => {
        res.status(422).json(err)
      })
  },
  create: function(req, res) {
    Book
      .find({id: req.body.id})
      .then(dbModel => {
        if (dbModel.length > 0) {
          res.status(200).json(dbModel)
        } else {
          Book
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
          }
      })
      .catch(err => {
        res.status(422).json(err)
      })
    
  },
  update: function(req, res) {
    Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}
