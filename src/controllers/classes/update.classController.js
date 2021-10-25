const { Class } = require("../../models");

const service = async function (req, res, next) {
     try {
          const payload = req.body;
          const where = { id: req.params.id };
          const requestDB = await Class.update(payload, { where });
          if (requestDB[0]) {
               return res.json({ msg: "kelas berhasil diperbarui", data: payload });
          } else {
               return res.json({ msg: "Kelas gagal diperbarui" });
          }
     } catch (error) {
          return res.status(500).json({ msg: error.toString() });
     }
};

module.exports = { service };
