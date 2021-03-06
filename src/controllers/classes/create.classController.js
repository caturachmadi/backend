const { Class } = require("../../models/index");
const { body } = require("express-validator");

const service = async function (req, res, next) {
     try {
          return res.json(req.auth);
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
     // body().custom((value) => {
     //      console.log(value);
     //      if (value.password !== value.passwordConfirm) {
     //           return Promise.reject("Password tidak cocok");
     //      }
     //      return Promise.reject("STOP");
     // }),
     body("code").notEmpty().withMessage("Kode kelas wajib di isi"),
     body("status").notEmpty().withMessage("Status tidak boleh kosong").isIn(["fullstack", "Data Science"]).withMessage("Status tidak sesuai"),
];
module.exports = { service, validation };
