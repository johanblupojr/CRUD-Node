import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

console.log("connecting to postgreSQL server at port " + process.env.DB_PORT);

export default sql;
