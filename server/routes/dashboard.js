var express = require('express');
var router = express.Router();
const { verifyJWTSession } = require("../utils/jwt");

const Transaction = require('../model/transactionModel')



router.use(verifyJWTSession)

// GET spending predictions
router.get('/spending-predictions/:category', function (req, res) {
    const ARIMA = require('arima')
    let options = {
        p: 0,
        d: 1,
        q: 1,
        verbose:false
    }

    let current = new Date('2023-01-01');
    current.setFullYear((new Date()).getFullYear());
    current.setMonth((new Date()).getMonth());

    let previous = new Date();
    previous.setFullYear(previous.getFullYear() - 1);
    previous.setDate(1);

    let filter = {
        user: req.user._id,
        transactionType: req.params.category,
        date: { $gte: previous, $lt: current }
    }
    getSummaryOfLast12Months(filter)
    .then(async (ts) => {
        const arima = new ARIMA(options).train(ts)
        const [pred] = arima.predict(10)

        let alpha = 0.3;
        let final = (alpha) * (ts[ts.length-1]) + (1-alpha)*(pred[0])
        return res.status(200).send(final.toString());
    })
    .catch((e) => console.log(e))
});

async function getSummaryOfLast12Months(filter) {

    return Transaction.aggregate([
        {
            $match: filter
        },
        {
            $group: {
                _id: {
                    month: { $month: "$date" },
                    year: { $year: "$date" }
                },
                sum: { $sum: "$amount" },
            }
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            }
        }
    ])
        .then((res) => {
            return res.map((row) => {
                return row.sum;
            })
        });

}

module.exports = router;