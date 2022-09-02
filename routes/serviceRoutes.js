'use strict';

const express = require('express');
const serviceControllers = require('../controllers/serviceControllers');
const router = express.Router();

const { addService, getServiceByOrder } = serviceControllers;


router.post('/service', addService);
router.get('/serviceByOrder/:id', getServiceByOrder);



module.exports = {
    routes: router
}