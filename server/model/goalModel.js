const mongoose = require('mongoose');

// create a schema
const budgetGoalSchema = new mongoose.Schema(
    {
        goalDetails: { type: String, required: true },
        completed: { type: Boolean, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
    },
    { timestamps: true }
);

// create a model
const Goal = mongoose.model('goals', budgetGoalSchema);

module.exports = Goal;