const jsonwebtoken = require("jsonwebtoken");

function isAuth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);

  req.userId = parseInt(decodedToken.sub)

  next()
}

module.exports = isAuth;
