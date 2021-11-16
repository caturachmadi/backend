const { User } = require("../../models");

const service = async function (req, res, next) {
     try {
          const where = { id: req.params.id };
          const requestDB = await User.destroy({ where });
          if (requestDB) {
               return res.json({ msg: "User Berhasil dihapus" });
          } else {
               return res.status(404).json({ msg: "User gagal dihapus" });
          }
     } catch {
          return res.status(500).json({ msg: error.toString() });
     }
};

module.exports = { service };
