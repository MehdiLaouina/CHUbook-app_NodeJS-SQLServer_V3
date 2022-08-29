'use strict';

const express = require('express');
const orderController = require('../controllers/orderControllers');
const router = express.Router();

const { getAllOrders, getOrderByService, getOrderByPatient, getOrderByEtat, addOrder } = orderController;

router.get('/orders', getAllOrders);
router.get('/orders_S/:id', getOrderByService);
router.get('/orders_P/:id', getOrderByPatient);
router.get('/orders_etat/:etat', getOrderByEtat);
router.post('/order', addOrder);



module.exports = {
    routes: router
}