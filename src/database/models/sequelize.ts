"use strict";

import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";

import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_PORT } from "../../util/secrets";

const options:any = {
    dialect: "postgres",
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT),
    logging: function (str: any) {
        //console.log(str);
    }
}

if(process.env.NODE_ENV == "staging" || (process.env.NODE_ENV == "production")){
    options['dialectOptions'] = { "ssl": true },
    options['ssl'] = true
};

const sequelize: Sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD,options);

export default sequelize;