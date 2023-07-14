var express = require('express');
var router = express.Router();
const Transaction = require('../model/transactionModel')

// GET TRANSACTIONS
router.get('/', function(_, res) {
  Transaction.find()
  .then((transactions) => {
    return res.status(200).send(transactions)
  })
  .catch((error) => {
    console.error(error)
    return res.status(400).send(error)
  })
});

// UPDATE TRANSACTION
router.put('/:id', function(req, res) {
  Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((transaction) => {
     return res.status(200).send(transaction)  
  })
  .catch((error) => {
    console.error(error);
    return res.status(400).send(error)
  });
})

module.exports = router;