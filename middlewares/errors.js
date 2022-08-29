function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (typeof err === "Unauthorized") {
    // jwt authentication error
    return res.status(401).json({ message: "Token not valid" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

module.exports = {
  errorHandler,
};
