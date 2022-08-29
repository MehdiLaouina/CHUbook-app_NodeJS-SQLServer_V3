'use strict';

const express = require('express');
const pharmacienControllers = require('../controllers/pharmacienControllers');
const router = express.Router();

const { login, register, userProfile } = pharmacienControllers;

router.post("/login", login);
router.post("/register", register);
router.get("/user-profile", userProfile);



module.exports = {
    routes: router
}