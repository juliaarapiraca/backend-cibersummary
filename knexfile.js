require("dotenv").config();

module.exports = {
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DB_HOST,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  },
  development: {
    client: "pg",
    connection: process.env.DB_HOST,
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};