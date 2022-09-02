'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getAllOrders = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ordonnance');
        const list = await pool.request().query(sqlQueries.getAllOrders);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOrderByService = async (libelle) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ordonnance');
        const list = await pool.request()
            .input('libelle', sql.VarChar, libelle)
            .query(sqlQueries.getOrderByService);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOrderByPatient = async (nom, prenom) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ordonnance');
        const list = await pool.request()
            .input('nom', sql.VarChar, nom)
            .input('prenom', sql.VarChar, prenom)
            .query(sqlQueries.getOrderByPatient);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getOrderByEtat = async (etat) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ordonnance');
        const list = await pool.request()
            .input('etat', sql.VarChar(1), etat)
            .query(sqlQueries.getOrderByEtat);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const addOrder = async (ordonnance) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('ordonnance');
        const list = await pool.request()
            .input('input1', sql.Int, ordonnance.Id_Hosix)
            .input('input2', sql.VarChar(300), ordonnance.designation)
            .input('input3', sql.VarChar(150), ordonnance.prescripteur)
            .input('input4', sql.DateTime, ordonnance.date)
            .input('input5', sql.VarChar(1), ordonnance.etat)
            .input('input6', sql.Int, ordonnance.Id_P)
            .input('input7', sql.Int, ordonnance.Id_S)
            .query(sqlQueries.addOrder);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}





module.exports = {
    getAllOrders,
    getOrderByService,
    getOrderByPatient,
    getOrderByEtat,
    addOrder
}