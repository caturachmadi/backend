"use strict";
const { Model, Sequelize } = require("sequelize");
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
     class User extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate(models) {
               // define association here
          }
     }
     User.init(
          {
               id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: Sequelize.UUIDV4,
               },
               fullName: DataTypes.STRING,
               address: DataTypes.STRING,
               email: DataTypes.STRING,
               password: {
                    type: DataTypes.STRING,
                    set(val) {
                         this.setDataValue("password", hashSync(val, genSaltSync(7)));
                    },
               },
               placebirth: DataTypes.STRING,
               birthdate: DataTypes.DATEONLY,
               province: DataTypes.STRING,
               city: DataTypes.STRING,
               lastStudy: DataTypes.STRING,
               curentJob: DataTypes.STRING,
          },
          {
               sequelize,
               modelName: "User",
               tableName: "pengguna",
          }
     );
     return User;
};
