'use strict';

const express = require('express');
const patientControllers = require('../controllers/patientControllers');
const router = express.Router();

const { addPatient } = patientControllers;


router.post('/patient', addPatient);



module.exports = {
    routes: router
}