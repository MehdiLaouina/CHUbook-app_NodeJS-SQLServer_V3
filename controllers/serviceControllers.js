'use strict';

const serviceData = require('../data/service');

const addService = async (req, res, next) => {
    try {
        const service = req.body;
        const S = await serviceData.addService(service);
        res.send(S);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addService
}