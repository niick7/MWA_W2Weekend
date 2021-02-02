const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

module.exports.register = function(req, res) {
  const newUser = {
    username = req.body.username,
    password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    name = req.body.name
  };
  User.create(newUser, function(err, user){
    const response = {status: 200, message: user};
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.login = function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}, function(err, user){
    const response = {status: 200, message: user};
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if(!user) {
      response.status = 401;
      response.message = {message: "Username or password is invalid."}
    }
    if(user) {
      if(bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({username: username}, "cs572", {expiresIn: 3600});
        response.message = {token: token};
      } else {
        response.status = 401;
        response.message = {message: "Username or password is invalid."}
      }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.authenticate = function(req, res, next) {
  const headerExists = req.headers.authorization;
  if (headerExists) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "cs572", function(err, decoded) {
      if (err) {
        res.status(401).json("Unauthorized");
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json("No token provided");
  }
};