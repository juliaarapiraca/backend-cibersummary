require("dotenv").config();
const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DB_HOST,
    ssl: { rejectUnauthorized: false }          
  }
});

module.exports = knex;