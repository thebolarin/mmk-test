import  PhoneNumber  from './phoneNumber';
'use strict';
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import sequelize from "./sequelize";

class Account extends Model {
    public auth_id: string;
    public username: string;
    public id: any;
}

Account.init({
  auth_id: {
        type: new DataTypes.STRING,
        allowNull: false,
  },
  username: {
    type: new DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
    tableName: "account",
    createdAt: false,
    updatedAt: false,
    sequelize,
});

Account.hasMany(PhoneNumber,{ as: 'phone_number', foreignKey: 'account_id' });

export default Account;