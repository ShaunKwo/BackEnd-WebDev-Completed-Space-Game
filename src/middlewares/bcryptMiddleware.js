//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.comparePassword = (req, res, next) => {
  // Check password
  const callback = (err, isMatch) => {
    if (err) {
      console.error("Error bcrypt:", err);
      res.status(500).json(err);
    } else {
      if (isMatch) {
        next();
      } else {
        res.status(401).json({
          message: "Wrong password",
        });
      }
    }
  };
  bcrypt.compare(req.body.password, res.locals.hash, callback);
};

module.exports.hashPassword = (req, res, next) => {
  const callback = (err, hash) => {
    if (err) {
      console.error("Error bcrypt:", err);
      res.status(500).json(err);
    } else {
      res.locals.hash = hash;
      next();
    }
  };

  bcrypt.hash(req.body.password, saltRounds, callback);
};
