var express = require('express');
var router = express.Router();
const { verifyJWTSession } = require("../utils/jwt");

const Transaction = require('../model/transactionModel')

var spawn = require('child_process').spawn;


router.use(verifyJWTSession)

// GET spending predictions
router.get('/spending-predictions', function (req, res) {
    const transactionTypes = ["Grocery",
     "Transportation", "Entertainment", "Food", "Other"
    ];

    let sum = 0;
    Promise.all(transactionTypes.map(async (type) => {
        let csv = await getSummaryOfLast12Months(req.user._id, type);
        return {name: type, prediction: await getPredictionOfCategory(csv)}
    }))
    .then((data) => {
        data.forEach((entry) => sum =+ entry.prediction);
        let result = {
            total: sum,
            categories: data
        }
        console.log(JSON.stringify(result))
        return res.status(200).send(result);
    })
    .catch((error) => {console.log(error)});
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
            console.log(`child process close all stdio with code ${code}`);
            console.log(`exited python script with: ` + sesOutput);
            resolve(sesOutput);
        })
    })

}

async function getSummaryOfLast12Months(userID, transactionType) {

    return Transaction.aggregate([
        {
            $match: {
                user: userID,
                transactionType: transactionType,
                date: { $gte: new Date('2023-01-01') }
            }
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