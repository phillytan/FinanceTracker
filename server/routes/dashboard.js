var express = require('express');
var router = express.Router();
const { verifyJWTSession } = require("../utils/jwt");

const Transaction = require('../model/transactionModel')

var spawn = require('child_process').spawn;


router.use(verifyJWTSession)

// GET spending predictions
router.get('/spending-predictions/:category', function (req, res) {
    let current = new Date('2023-01-01');
    current.setFullYear((new Date()).getFullYear()); 
    current.setMonth((new Date()).getMonth()); 

    let previous = new Date();
    previous.setFullYear(previous.getFullYear() - 1); 
    previous.setDate(1);

    let filter = {
        user: req.user._id,
        transactionType: req.params.category,
        date: { $gte: previous,$lt: current}
    }

    getSummaryOfLast12Months(filter)
        .then(async (csv) => {
            let result = await getPredictionOfCategory(csv);
            return res.status(200).send(result);
        })
        .catch((e) => console.log(e))
});

// returns a promise
async function getPredictionOfCategory(csv) {
    var child = spawn('python', ["utils/ses.py", csv]);

    let sesOutput;
    child.stdout.on('data', function (data) {
        sesOutput = data.toString().replace(/\s/g, '');
    });

    child.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`);
    });

    return await new Promise((resolve) => {
        child.on('close', (code) => {
            resolve(sesOutput);
        })
    })

}

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
            let csv = "sum";
            res.forEach((row) => {
                csv = csv + "\n" + row.sum
            })
            return csv;
        });

}

module.exports = router;