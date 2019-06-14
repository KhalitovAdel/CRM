const express   = require('express'),
publicROUT      = express.Router(),
ctrlAuth        = require('../../controllers/auth');

publicROUT.post('/login', ctrlAuth.login);
publicROUT.post('/registration', ctrlAuth.registration);

module.exports = publicROUT;