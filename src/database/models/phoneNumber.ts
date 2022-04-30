import Account from './account';
'use strict';
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import sequelize from "./sequelize";

class PhoneNumber extends Model {
  public account_id: number;
  public number: string;
  public id: number;
}

PhoneNumber.init({
  account_id: {
    type: new DataTypes.INTEGER,
    allowNull: false,
  },
  number: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "phone_number",
  createdAt: false,
  updatedAt: false,
  sequelize,
});

// PhoneNumber.belongsTo(Account, {
//   foreignKey: "account_id", 
//   as: "account"
// });

export default PhoneNumber;