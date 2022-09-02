'use strict';

const express = require('express');

const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const patientRoutes = require('./routes/patientRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const pharmacienRoutes = require('./routes/pharmacienRoutes');

const app = express();

const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const { unless } = require("express-unless");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/login", methods: ["POST"] },
            { url: "/users/register", methods: ["POST"] },
            { url: "/api/orders_S/:libelle", methods: ["GET"] },
            { url: "/api/orders", methods: ["GET"] },
            { url: "/api/orders_P/:id", methods: ["GET"] },
            { url: "/api/orders_etat/:etat", methods: ["GET"] },
            { url: "/api/order", methods: ["POST"] },
        ],
    })
);

app.use(express.json());

// initialize routes
app.use('/users', pharmacienRoutes.routes);
app.use('/api', orderRoutes.routes);
app.use('/api', patientRoutes.routes);
app.use('/api', serviceRoutes.routes);

// middleware for error responses
app.use(errors.errorHandler);



app.listen(config.port, () => console.log('Server is listening on ' + config.port));