'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const addService = async (service) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('service');
        const list = await pool.request()
            .input('input', sql.VarChar(200), service.libelle)
            .query(sqlQueries.addService);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}



module.exports = {
    addService
}