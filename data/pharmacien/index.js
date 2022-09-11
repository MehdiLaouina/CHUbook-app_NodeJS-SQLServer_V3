'use strict';

const bcrypt = require("bcryptjs");
const auth = require("../../middlewares/auth");

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');



const getPharmacienbyEmail = async (email, pool) => {
    try {
        const sqlQueries = await utils.loadSqlQueries('pharmacien');
        const list = await pool.request()
            .input('email', sql.VarChar(100), email)
            .query(sqlQueries.getPharmacienbyEmail);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}


const checkExistanceQuery = async (pool, { email, password }, callback) => {
    try {
        const sqlQueries = await utils.loadSqlQueries('pharmacien');
        const list = await pool.request()
            .input('email', sql.VarChar(100), email)
            .query(sqlQueries.checkExistance);
        const bodyEmail = email;
        if (list.recordset[0] === undefined) {
            return callback({
                message: "Invalid Email/Password!",
            });

        } else {
            if (bcrypt.compareSync(password, list.recordset[0].password)) {
                const data1 = await getPharmacienbyEmail(bodyEmail, pool);
                const token = auth.generateAccessToken(bodyEmail);
                const id = data1[0].id;
                const nom = data1[0].nom;
                const prenom = data1[0].prenom;
                const email = data1[0].email;
                return callback(null, {
                    id,
                    nom,
                    prenom,
                    email,
                    token
                });
            } else {
                return callback({
                    message: "Invalid Email/Password!",
                });
            }
        }
        //return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const login = async ({ email, password }, callback) => {
    try {
        let pool = await sql.connect(config.sql);
        callback = await checkExistanceQuery(pool, { email, password }, callback);
        return callback;

    } catch (error) {
        return error.message;
    }
}




const register = async (params, callback) => {
    try {
        if (params.nom === undefined) {
            return callback(
                {
                    message: "Nom Obligatoire",
                },
                ""
            );
        }
        if (params.prenom === undefined) {
            console.log(params.prenom);
            return callback(
                {
                    message: "Prenom Obligatoire",
                },
                ""
            );
        }
        if (params.email === undefined) {
            console.log(params.email);
            return callback(
                {
                    message: "Email Obligatoire",
                },
                ""
            );
        }
        if (params.password === undefined) {
            console.log(params.password);
            return callback(
                {
                    message: "Password Obligatoire",
                },
                ""
            );
        }

        let pool = await sql.connect(config.sql);
        const data = await checkRegisterExistance(pool, params);
        if (typeof data === "String") return callback(data);
        if (data[0].total > 0) {
            return callback({
                message: "Email already in use!",
            })
        } else {
            const data1 = await addPharmacien(pool, params);
            if (typeof data1 === "String") return callback(data1);
            const token = auth.generateAccessToken(params.email);
            const id = data1[0].id;
            const nom = data1[0].nom;
            const prenom = data1[0].prenom;
            const email = data1[0].email;
            return callback(null, {
                id,
                nom,
                prenom,
                email,
                token
            });
        }
    } catch (error) {
        return error.message;
    }
}

const checkRegisterExistance = async (pool, params) => {
    try {
        const sqlQueries = await utils.loadSqlQueries('pharmacien');
        const list = await pool.request()
            .input('email', sql.VarChar(100), params.email)
            .query(sqlQueries.checkRegisterExistance);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}


const addPharmacien = async (pool, params) => {
    try {
        const sqlQueries = await utils.loadSqlQueries('pharmacien');
        const insertPharmacien = await pool.request()
            .input('input1', sql.VarChar(), params.nom)
            .input('input2', sql.VarChar(), params.prenom)
            .input('input3', sql.VarChar(), params.email)
            .input('input4', sql.VarChar(), params.password)
            .query(sqlQueries.addPharmacien);
        return insertPharmacien.recordset;
    } catch (error) {
        return error.message;
    }
}




module.exports = {
    login,
    register,
}