const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'cibersummary'
});

const query = (text, param) => {
    return pool.query(text, param);
};

module.exports = {
    query
};