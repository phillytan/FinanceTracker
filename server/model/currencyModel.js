const mongoose = require("mongoose");

// create a schema
const currencySchema = new mongoose.Schema(
	{
		currencyName: { type: String, required: false },
		conversionRates: {
			type: Map,
			of: mongoose.Schema.Types.Decimal128
		},
	},
	{ timestamps: true }
);

// create a model
const Currency = mongoose.model("currency", currencySchema);

module.exports = Currency;
