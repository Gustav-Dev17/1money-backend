const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const { User } = require("../models");

const verifyToken = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        req.email = decoded.email;
        User.findOne({ email: decoded.email })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            res.status(401).json({ error: err });
          });
      });
    } else {
      return res.status(400).json({ message: "You're not authenticated" });
    }
  } catch (e) {
    return res.status(404).json({ message: "Token not found" });
  }
};

module.exports = verifyToken;