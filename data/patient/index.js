'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const addPatient = async (patient) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('patient');
        const list = await pool.request()
            .input('input1', sql.VarChar(50), patient.nom)
            .input('input2', sql.VarChar(50), patient.prenom)
            .input('input3', sql.VarChar(1), patient.sexe)
            .input('input4', sql.Date, patient.date_naissance)
            .query(sqlQueries.addPatient);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getPatientByOrder = async (Id_P) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('patient');
        const list = await pool.request()
            .input('Id_P', sql.VarChar(50), Id_P)
            .query(sqlQueries.getPatientByOrder);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}



module.exports = {
    addPatient,
    getPatientByOrder
}