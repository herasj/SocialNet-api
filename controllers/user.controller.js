'use strict';
const sql = require('mssql');
const config = require('../config/database');

module.exports = {
	create: async ({ name, last, phone, birth, email, pass, token }) => {
		const query = `INSERT INTO dbo.users (name, lastname, phone, birthday, token, email, password) 
        VALUES('${name}','${last}','${phone}','${birth}','${token}','${email}','${pass}');`;

		try {
			let pool = await sql.connect(config);
			let result1 = await pool.request().query(query); //Query
			return result1;
		} catch (err) {
			throw new Error(err);
		}
	},
	auth: async ({ email, pass }) => {
		try {
			const query = `SELECT p.name,p.lastname,p.birthday,p.phone,p.profile
                FROM dbo.users p
                WHERE p.email='${email}' AND p.password='${pass}'`;
			let pool = await sql.connect(config);
			let result1 = await pool.request().query(query); //Query
			const envio = result1.recordset;
			console.log(envio);
			if (envio.length == 0) throw 404; //Not Found
			return envio;
		} catch (err) {
			throw new Error(err);
		}
	}
};
