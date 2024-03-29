var express = require('express')
var router = express.Router()
const Transaction = require('../model/transactionModel')
const { verifyJWTSession } = require('../utils/jwt')
const mongoose = require('mongoose')

router.use(verifyJWTSession)

// GET TRANSACTIONS
router.get('/', function (req, res) {
  Transaction.find({ user: req.user._id })
    .then((transactions) => {
      return res.status(200).send(transactions)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

router.get('/topCategories/:startDate/:endDate', function (req, res) {
  const userId = new mongoose.Types.ObjectId(req.user._id)
  const startDate = req.params.startDate
  const endDate = req.params.endDate

  Transaction.aggregate([
    {
      $match: {
        user: userId,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: '$transactionType',
        count: { $sum: 1 },
        totalAmount: { $sum: '$amountInCAD' },
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
    {
      $project: {
        _id: 1,
        count: 1,
        totalAmount: { $round: ['$totalAmount', 2] },
      },
    },
    {
      $limit: 3,
    },
  ])
    .then((result) => {
      return res.json(result)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

// INSERT TRANSACTIONS. Takes in an array of transactions
router.post('/', function (req, res) {
  const transactions = req.body.map((transaction) => {
    return {
      ...transaction,
      user: req.user._id,
    }
  })
  Transaction.insertMany(transactions)
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
  Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true },
  )
    .then((transaction) => {
      return res.status(200).send(transaction)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

// DELETE TRANSACTION
router.delete('/:id', function (req, res) {
  Transaction.findByIdAndDelete({ _id: req.params.id, user: req.user._id })
    .then((transaction) => {
      return res.status(200).send(transaction)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

module.exports = router
