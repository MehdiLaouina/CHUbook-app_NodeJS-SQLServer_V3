'use strict';

const orderData = require('../data/ordonnance');

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderData.getAllOrders();
        res.send(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getOrderByService = async (req, res, next) => {
    try {
        const libelle = req.params.libelle;
        const orders_S = await orderData.getOrderByService(libelle);
        res.send(orders_S);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getOrderByPatient = async (req, res, next) => {
    try {
        const nomPrenom = req.params.nomPrenom;
        if (nomPrenom.toString().includes(' ')) {
            var tab = nomPrenom.toString().split(" ");
            const orders_P = await orderData.getOrderByPatient(tab[0], tab[1]);
            res.send(orders_P);
        } else {
            const orders_P = await orderData.getOrderByPatient(nomPrenom, '');
            res.send(orders_P);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getOrderByEtat = async (req, res, next) => {
    try {
        const etat = req.params.etat;
        const orders_etat = await orderData.getOrderByEtat(etat);
        res.send(orders_etat);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addOrder = async (req, res, next) => {
    try {
        const ordonnance = req.body;
        const order = await orderData.addOrder(ordonnance);
        res.send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    getAllOrders,
    getOrderByService,
    getOrderByPatient,
    getOrderByEtat,
    addOrder
}