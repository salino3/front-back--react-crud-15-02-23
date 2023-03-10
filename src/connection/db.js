
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  database: "",
  port: `${process.env.PORTDB}`,
});

module.exports = {db};