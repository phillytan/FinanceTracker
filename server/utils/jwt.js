const jwt = require('jsonwebtoken')
const User = require("../model/userModel");

const JWT_SECRET = process.env.JWT_SECRET || 'The quick brown fox jumps over the lazy dog.'

// Helper function to create a JWT session token
const createJWTSession = (user) => {
	return {
		token: jwt.sign({ userId: user.id }, JWT_SECRET, {}),
	};
};

// Express Middleware Function to verify JWT session tokens
const verifyJWTSession = async (req, res, next) => {
  const { accesstoken } = req.headers
  if (!accesstoken) {
    return res.status(401).send({ message: 'No Access token Specified' })
  }
  try {
    const { userId } = jwt.verify(accesstoken, JWT_SECRET);
    const user = await User.findById(userId)
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    return res.status(400).send(e)
  }
}

module.exports = {
	createJWTSession,
	verifyJWTSession,
};