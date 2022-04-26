const Pool = require('pg').Pool
const pool = new Pool({
    user:"dmitriy",
    password:"Fredperry1905",
    host:"localhost",
    port:5432,
    database:'test_api'
});
module.exports = pool;