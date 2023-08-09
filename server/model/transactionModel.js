const mongoose = require('mongoose')

// create a schema
const transactionSchema = new mongoose.Schema(
  {
    merchantName: { type: String, required: false },
    amount: { type: Number, required: true },
    amountInCAD: { type: Number, required: false },
    address: { type: String, required: false },
    date: { type: Date, required: true },
    transactionType: { type: String, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    description: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true },
)

// create a model
const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction
