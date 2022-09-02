'use strict';

const express = require('express');
const patientControllers = require('../controllers/patientControllers');
const router = express.Router();

const { addPatient, getPatientByOrder } = patientControllers;


router.post('/patient', addPatient);
router.get('/patientByOrder/:id', getPatientByOrder);



module.exports = {
    routes: router
}