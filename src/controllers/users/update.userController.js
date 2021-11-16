const {
     User,
     Sequelize: { Op },
} = require("../../models");
const { body } = require("express-validator");

const service = async function (req, res, next) {
     try {
          const payload = req.body;
          const where = { id: req.params.id };
          const requestDB = await User.update(payload, { where });
          if (requestDB[0]) {
               return res.json({ msg: "User berhasil dihapus", data: payload });
          } else {
               return res.json({ msg: "user gagal di update" });
          }
     } catch (error) {
          return res.status(500).json({ msg: error.toString() });
     }
};

const validation = [
     body("email")
          .notEmpty()
          .withMessage("Alamat email harus diisi")
          .custom(async (value, { req }) => {
               const dataUser = await User.findOne({ where: { name: value, id: { [Op.ne]: req.params.id } } });
               if (dataUser) {
                    return Promise.reject(`Alamat email ${value} sudah dipakai`);
               }
               return true;
          }),
];

module.exports = { service, validation };
