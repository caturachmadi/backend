const { User } = require("../../models");

const service = async function (req, res, next) {
     try {
          const payload = req.body;
          const requestDB = await User.create(payload);
          return res.json({ msg: "Data berhasil disimpan", data: requestDB });
     } catch {
          return res.status(500).json({ msg: error.toString() });
     }
};

module.exports = { service };
