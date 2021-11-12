const jwt = require("jsonwebtoken");

const createJWT = (user) => {
     delete user.dataValues.password;
     const token = jwt.sign({ user: user.dataValues }, "private-key-classroom", { expiresIn: "24h" });
     return token;
};

const checkJWT = (req, res, next) => {
     const token = req.get("Authorization");
     if (!token) {
          return res.status(401).json({ msg: "Unauthorized" });
     } else {
          jwt.verify(token, "private-key-classroom", (err, decode) => {
               if (err) return res.status(401).json({ msg: err.message });
               else {
                    req.auth = decode.user;
                    next();
               }
          });
     }
};

module.exports = { createJWT, checkJWT };
