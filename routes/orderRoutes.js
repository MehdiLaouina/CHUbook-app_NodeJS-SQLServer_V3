'use strict';

const express = require('express');
const orderController = require('../controllers/orderControllers');
const router = express.Router();

const { getAllOrders, getOrderByService, getOrderByPatient, getOrderByEtat, getOrderById, addOrder } = orderController;

router.get('/orders', getAllOrders);
router.get('/orders_S/:libelle', getOrderByService);
router.get('/orders_P/:nomPrenom', getOrderByPatient);
router.get('/orders_etat/:etat', getOrderByEtat);
router.get('/order_Id/:id', getOrderById);
router.post('/order', addOrder);



module.exports = {
    routes: router
}