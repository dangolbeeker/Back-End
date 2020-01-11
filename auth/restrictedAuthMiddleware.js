const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "willy wonka";

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Invalid credentials. Please try again." });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ message: "Please provide valid credentials to enter. " });
  }
};
