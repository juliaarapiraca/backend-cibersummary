require("dotenv").config();

module.exports = {
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DB_HOST,
      ssl: { rejectUnauthorized: false }
    }
  },
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.DB_HOST,
      ssl: { rejectUnauthorized: false }
    }
  }
};