"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
     class Schedule extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate({ Schedule, Class, JoinClass }) {
               Schedule.belongsTo(Class);
               Schedule.belongsToMany(JoinClass, { through: "presences" });
          }
     }
     Schedule.init(
          {
               name: DataTypes.STRING,
               classId: DataTypes.STRING,
               session: DataTypes.INTEGER,
               start: DataTypes.DATE,
               end: DataTypes.DATE,
          },
          {
               sequelize,
               modelName: "Schedule",
          }
     );
     return Schedule;
};
