const sql = require('mssql');
const config = require('../config/database');

sql.on('error', err => {
    console.error(err);
})

module.exports = {

    create: async () => {
        try {
            let pool = await sql.connect(config)
            let result1 = await pool.request()
                .query('select * from dbo.users') //Query
            console.dir(result1)
        } catch (err) {
            console.error(err);
            // ... error checks
        }
    }
};