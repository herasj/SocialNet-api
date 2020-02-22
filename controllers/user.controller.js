'use strict'
const sql = require('mssql');
const config = require('../config/database');

module.exports = {
    create: async ({name, last, phone, birth, email, pass}) => {
        const query = `INSERT INTO dbo.users (name, lastname, phone, birthday, email ,password) 
        VALUES('${name}','${last}','${phone}','${birth}','${email}','${pass}');`;

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
    auth: async ({email, pass}) => {
            try {
                const query = `SELECT p.name,p.lastname,p.birthday,p.phone,p.profile
                FROM dbo.users p
                WHERE p.email='${email}' AND p.password='${pass}'`;
                let pool = await sql.connect(config)
                let result1 = await pool.request()
                    .query(query) //Query
                    const envio = result1.recordset;
                    console.log("Resuelto");
                    return envio;
                
                
            } catch (err) {
                return err;
            } 
    }
}