var express = require('express');
var router = express.Router();
const Saving = require('../model/savingModel')
const { verifyJWTSession } = require("../utils/jwt");

router.use(verifyJWTSession)

// GET TRANSACTIONS
router.get('/', function (req, res) {
  Saving.find({ user: req.user._id })
    .then((savings) => {
      return res.status(200).send(savings);
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send(error);
    });
});

// INSERT TRANSACTIONS. Takes in an array of savings
router.post('/', function (req, res) {
  const savings = req.body.map(saving => {
    return {
      ...saving,
      user: req.user._id
    };
  })
  Saving.insertMany(savings)
    .then((savings) => {
      return res.status(200).send(savings)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

// UPDATE TRANSACTION
router.put('/:id', function (req, res) {
  Saving.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    .then((saving) => {
      return res.status(200).send(saving)
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send(error)
    });
})

// DELETE TRANSACTION
router.delete('/:id', function (req, res) {
  Saving.findByIdAndDelete({ _id: req.params.id, user: req.user._id })
    .then((saving) => {
      return res.status(200).send(saving);
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send(error);
    });
})

module.exports = router;