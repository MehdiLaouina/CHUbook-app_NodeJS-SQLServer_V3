'use strict';

const patientData = require('../data/patient');

const addPatient = async (req, res, next) => {
    try {
        const patient = req.body;
        const P = await patientData.addPatient(patient);
        res.send(P);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addPatient
}