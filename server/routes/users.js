var express = require('express');
var router = express.Router();
const User = require('../model/userModel')
const bcrypt = require("bcrypt");
const { createJWTSession, verifyJWTSession } = require("../utils/jwt");

router.get('/me', verifyJWTSession, async (req, res) => {
  return res.status(200).send(req.user)
})

router.post('/', async (req, res) => {
  const { fname, lname, email, password } = req.body
  if (!fname || !lname || !email || !password) {
    return res.status(400).send({ message: 'One of required fields was not passed properly.' })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword
    })
    return res.status(200).send(createJWTSession(user))
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "One of required fields was not passed properly." });
  }
	try {
    const user = await User.findOne({ email })
    if (!user) {
			return res.status(400).send({ message: "Invalid Username or Password" });
		}
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid Username or Password' })
    }
		return res.status(200).send(createJWTSession(user));
	} catch (error) {
		console.error(error);
		return res.status(400).send(error);
	}
});

module.exports = router;
