var express = require("express");
var router = express.Router();
const Currencies = require("../model/currencyModel");
const axios = require('axios')
// const { verifyJWTSession } = require("../utils/jwt");

// router.use(verifyJWTSession);

// GET CURRENCIES
router.get("/", function (req, res) {
	Currencies.find({})
		.then((currencies) => {
			return res.status(200).send(currencies);
		})
		.catch((error) => {
			console.error(error);
			return res.status(400).send(error);
		});
});

// POST CURRENCIES
router.post("/:currency", async function (req, res) {
  const currencyName = req.params.currency?.toUpperCase();
  if (!currencyName) {
		res.status(400).send("No Currency");
		return;
	}
  const existingCurrency = await Currencies.findOne({ currencyName });
  if (existingCurrency) {
		res.status(200).json(existingCurrency);
		return;
	}
  const currencyData = await axios(
		`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/latest/${currencyName}`
	);
  res.status(200).send(await Currencies.create({
		currencyName,
		conversionRates: currencyData.data.conversion_rates
	}))
  return
});

module.exports = router;
