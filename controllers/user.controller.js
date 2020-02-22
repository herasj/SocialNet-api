const sql = require('mssql');
const config = require('../config/database');

module.exports = {
    create: async (params) => {
        const query = `INSERT INTO dbo.users (name, lastname, phone, birthday, email ,password) 
        VALUES('${params.name}','${params.last}','${params.phone}','${params.birth}','${params.email}','${params.pass}');`;

        try {
            let pool = await sql.connect(config)
            let result1 = await pool.request()
                .query(query) //Query
            return result1;
        } catch (err) {   
            console.error(err);
            return err;
            // ... error checks
        }
    },
    auth: async (params,res) => {
        try {
            const query = `SELECT p.name,p.lastname,p.birthday,p.phone,p.profile
            FROM dbo.users p
            WHERE p.email='${params.email}' AND p.password='${params.pass}'`;

            let pool = await sql.connect(config)
            let result1 = await pool.request()
                .query(query) //Query
            const envio = result1.recordset;
            res.send(envio);
        } catch (err) {
            console.error(err);
            // ... error checks
        }
    }
};