import { Sequelize } from "sequelize";

const sql = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
  logging: false
});

sql.sync({ alter: true });

export default sql;