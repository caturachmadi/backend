"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
     class JoinClass extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate({ JoinClass, Schedule }) {
               JoinClass.belongsToMany(Schedule, { through: "presences" });
          }
     }
     JoinClass.init(
          {
               id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: Sequelize.UUIDV4,
               },
               userId: DataTypes.UUID,
               classId: DataTypes.INTEGER,
               role: {
                    type: DataTypes.ENUM(["student", "tutor", "fasilitator"]),
                    defaultValue: "student",
               },
          },
          {
               sequelize,
               modelName: "JoinClass",
          }
     );
     return JoinClass;
};
