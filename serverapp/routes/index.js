const express   = require('express'),
router          = express.Router(),
publicROUT      = require('./Public/index'),
crmROUT         = require('./Crm/index');


router.use('/crm', crmROUT);
router.use('/public', publicROUT);

module.exports = router;