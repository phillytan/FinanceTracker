var express = require('express')
var router = express.Router()
const Goal = require('../model/goalModel')
const { verifyJWTSession } = require('../utils/jwt')

router.use(verifyJWTSession)

// GET GOALS
router.get('/', function (req, res) {
  Goal.find({ user: req.user._id })
    .then((goals) => {
      return res.status(200).send(goals)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

// INSERT GOAL. Takes in a goal array
router.post('/', function (req, res) {
  const goalToAdd = req.body.map((goal) => {
    return {
      ...goal,
      user: req.user._id,
    }
  })
  Goal.insertMany(goalToAdd)
    .then((newGoal) => {
      return res.status(200).send(newGoal)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

// UPDATE GOAL
router.put('/:id', function (req, res) {
  Goal.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, {
    new: true,
  })
    .then((goal) => {
      return res.status(200).send(goal)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

// DELETE GOAL
router.delete('/:id', function (req, res) {
  Goal.findByIdAndDelete({ _id: req.params.id, user: req.user._id })
    .then((goal) => {
      return res.status(200).send(goal)
    })
    .catch((error) => {
      console.error(error)
      return res.status(400).send(error)
    })
})

module.exports = router
