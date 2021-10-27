const {
     Class,
     Sequelize: { Op },
} = require("../../models");
const { body } = require("express-validator");

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

const validation = [
     body("name")
          .notEmpty()
          .withMessage("Nama kelas wajib diisi")
          // .custom(async (value, { req }) => {
          //      const dataClass = await Class.findOne({ where: { name: value } });
          //      console.log(req.params.id, "-----", dataClass.id);
          //      if (dataClass && req.params.id != dataClass.id) {
          //           return Promise.reject(`Nama Kelas ${value} sudah digunakan`);
          //      }
          //      return true;
          // }),
          .custom(async (value, { req }) => {
               const dataClass = await Class.findOne({ where: { name: value, id: { [Op.ne]: req.params.id } } });
               if (dataClass) {
                    return Promise.reject(`Nama Kelas ${value} sudah digunakan`);
               }
               return true;
          }),
];

module.exports = { service, validation };
