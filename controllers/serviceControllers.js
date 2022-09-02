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

const getServiceByOrder = async (req, res, next) => {
    try {
        const Id_S = req.params.id;
        const service_order = await serviceData.getServiceByOrder(Id_S);
        res.send(service_order);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addService,
    getServiceByOrder
}