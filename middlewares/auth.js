const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "Auth.TOKEN_SECRET", (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

function generateAccessToken(email) {
  return jwt.sign({ data: email }, "Auth.TOKEN_SECRET", {
    expiresIn: "10h",
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
