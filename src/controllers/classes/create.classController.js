const { Class } = require("../../models/index");
const { body } = require("express-validator");

const service = async function (req, res, next) {
     try {
          const payload = req.body;
          const requestDB = await Class.create(payload);
          return res.json({ msg: "kelas berhasil ditambahkan ", data: requestDB });
     } catch (error) {
          return res.status(500).json({ msg: error.toString() });
     }
};

const validation = [
     body("name")
          .notEmpty()
          .withMessage("Nama kelas wajib diisi")
          .custom(async (value) => {
               const dataClass = await Class.findOne({ where: { name: value } });
               if (dataClass) {
                    return Promise.reject(`Nama kelas ${value} sudah digunakan`);
               }
               return true;
          }),
     body("code").notEmpty().withMessage("Kode kelas wajib di isi"),
];
module.exports = { service, validation };
