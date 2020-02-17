const sql = require('mssql');
const config = require('../config/database');
(async function () {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .query('select *') //Query

        console.dir(result1)

    } catch (err) {
        console.error(err);
        // ... error checks
    }
})()
 
sql.on('error', err => {
    console.error(err);
})