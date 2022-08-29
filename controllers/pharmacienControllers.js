'use strict';

const bcrypt = require("bcryptjs");
const pharmacienData = require('../data/pharmacien');

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    pharmacienData.login({ email, password }, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.register = (req, res, next) => {
    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);

    req.body.password = bcrypt.hashSync(password, salt);

    pharmacienData.register(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "Authorized User!!" });
};