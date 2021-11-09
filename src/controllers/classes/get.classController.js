const {
     Class,
     Sequelize: { Op },
} = require("../../models");

const service = async function (req, res, next) {
     try {
          const where = {};
          let page = Number(req.query.page) || 1;
          let limit = Number(req.query.limit) || 3;
          if (req.params.id) {
               where.id = {
                    [Op.eq]: req.params.id,
               };
          }
          // const fields = ["name", "description", "createdAt", "img"];
          // const json = {
          //      key: "1234",
          // };
          // fields.forEach((field) => {
          //      json[field] = field + "Attribute";
          // });
          // return res.json(json);
          if (req.query.search) {
               where.name = {
                    [Op.substring]: req.query.search,
               };
          }
          const requestDB = await Class.findAll({
               // attributes: ["id", "name", "img", "createdAt"],
               attributes: { exclude: ["updatedAt", "deletedAt"] },
               where,
               offset: (page - 1) * limit,
               limit,
          });

          if (!req.params.id) return res.json(requestDB);
          else {
               if (requestDB.length < 1) {
                    return res.status(404).json({ msg: "Kelas tidak ditemukan" });
               } else {
                    return res.json(requestDB[0]);
               }
          }
          return res.json(requestDB);
     } catch (error) {
          return res.status(500).json({ msg: error.toString() });
     }
};

module.exports = { service };
