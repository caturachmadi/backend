"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
     class Schedule extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate(models) {
               // define association here
          }
     }
     Schedule.init(
          {
               classId: DataTypes.STRING,
               name: DataTypes.STRING,
               code: {
                    type: DataTypes.STRING(6),
                    unique: true,
               },
               start: DataTypes.DATEONLY,
               end: DataTypes.DATEONLY,
          },
          {
               sequelize,
               modelName: "Schedule",
          }
     );
     return Schedule;
};
