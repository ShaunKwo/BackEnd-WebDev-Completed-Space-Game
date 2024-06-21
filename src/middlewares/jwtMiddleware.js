//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

require("dotenv").config();

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

module.exports.generateToken = (req, res, next) => {
  const payload = {
    userId: res.locals.userId,
    username: res.locals.username,
    timestamp: new Date()
  };

  const options = {
    algorithm: tokenAlgorithm,
    expiresIn: tokenDuration,
  };

  const callback = (err, token) => {
    if (err) {
      console.error("Error jwt:", err);
      res.status(500).json(err);
    } else {
      res.locals.token = token;
      next();
    }
  };

  // Generate a JWT token with the provided payload and duration
  const token = jwt.sign(payload, secretKey, options, callback);
};

module.exports.sendToken = (req, res, next) => {
  res.status(200).json({
    user_id: res.locals.user_id,
    message: res.locals.message,
    token: res.locals.token,
  });
};

module.exports.verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const callback = (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Token is valid, store the decoded information for later use
    console.log("Decoded token:", decoded);decoded
    res.locals.userId = decoded.userId;
    res.locals.username = decoded.username;
    res.locals.tokenTimestamp = decoded.timestamp;
    // Move to the next middleware or route handler
    next();
  };
  // Verify the token
  jwt.verify(token, secretKey, callback);
};


module.exports.showVerifiedToken = (req, res, next) => {
  const userId = res.locals.userId;
  const username = res.locals.username
  const tokenTimestamp = res.locals.tokenTimestamp;
  data = {
    userId: userId,
    username: username,
    tokenTimestamp: tokenTimestamp
  }
  res.status(200).json(data)
};