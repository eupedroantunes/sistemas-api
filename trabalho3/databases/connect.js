import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize(
  "trabalho_03", process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  dialect: "mysql",
  dialectOptions: {
    host: "127.0.0.1",
    port: 3306
  }
});