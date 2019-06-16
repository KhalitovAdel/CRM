const express   = require('express'),
crmROUT         = express.Router(),
ctrlUsers       = require('../../controllers/users');

crmROUT.post('/profile/img', ctrlUsers.img);

crmROUT.get('/profile/get', ctrlUsers.profile);

crmROUT.put('/profile/put', ctrlUsers.update);

module.exports = crmROUT;