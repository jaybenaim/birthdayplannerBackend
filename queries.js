const Pool = require("pg").Pool;
require("dotenv").config();
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  port: 5432
});
