const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST
    }
});

module.exports = knex;