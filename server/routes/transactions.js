var express = require('express');
var router = express.Router();
const Transaction = require('../model/transactionModel')
const { verifyJWTSession } = require("../utils/jwt");

router.use(verifyJWTSession)

// GET TRANSACTIONS
router.get('/', function (_, res) {
  Transaction.find()
    .then((transactions) => {
      return res.status(200).send(transactions)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
});

// INSERT TRANSACTIONS. Takes in an array of transactions
router.post('/', function (req, res) {
  Transaction.insertMany(req.body)
  .then((transactions) => {
    return res.status(200).send(transactions)
  })
  .catch((error) => {
    console.error(error)
    return res.status(400).send(error)
  })
})

// UPDATE TRANSACTION
router.put('/:id', function (req, res) {
  Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((transaction) => {
      return res.status(200).send(transaction)
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send(error)
    });
})

// DELETE TRANSACTION
router.delete('/:id', function (req, res) {
  Transaction.findByIdAndDelete(req.params.id)
    .then((transaction) => {
      return res.status(200).send(transaction)
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).send(error)
    });
})

module.exports = router;