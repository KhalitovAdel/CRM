const express   = require('express'),
publicROUT      = express.Router(),
ctrlAuth        = require('../../controllers/auth');

publicROUT.post('/login', ctrlAuth.login);
publicROUT.post('/registration', ctrlAuth.registration);
publicROUT.post('/logout', ctrlAuth.logout);
publicROUT.post('/submitRegister', ctrlAuth.submitRegister);

module.exports = publicROUT;