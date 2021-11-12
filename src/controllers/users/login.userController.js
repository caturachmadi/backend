const { User } = require("../../models");
const { compareSync } = require("bcrypt");
const { createJWT } = require("../../middlewares/jwt");
const service = async function (req, res, next) {
     try {
          const user = await User.findOne({ where: { email: req.body.email } });
          const validUser = compareSync(req.body.password, user.password);
          if (validUser) return res.json({ access: createJWT(user) });
          else return res.status(404).json({ msg: "email dan password tidak cocok" });
     } catch (error) {
          return res.status(500).json({ msg: error.toString() });
     }
};

module.exports = { service };
