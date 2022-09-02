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

const getPatientByOrder = async (req, res, next) => {
    try {
        const Id_P = req.params.id;
        const patient_Order = await patientData.getPatientByOrder(Id_P);
        res.send(patient_Order);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addPatient,
    getPatientByOrder
}