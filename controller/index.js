const db = {Book: require("../models")}

module.exports = {
  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .find(req.query)
      .then(dbModel => {
        console.log(req.query)
        if (dbModel.length > 0) {
          res.status(200).json(dbModel)
        } else {
          res.status(400)
        }
      })
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}
