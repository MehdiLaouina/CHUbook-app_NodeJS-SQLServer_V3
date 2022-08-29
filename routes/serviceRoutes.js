'use strict';

const express = require('express');
const serviceControllers = require('../controllers/serviceControllers');
const router = express.Router();

const { addService } = serviceControllers;


router.post('/service', addService);



module.exports = {
    routes: router
}