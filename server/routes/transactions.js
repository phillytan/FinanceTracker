var express = require('express');
var router = express.Router();
const Transaction = require('../model/transactionModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a transaction');
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