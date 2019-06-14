const express   = require('express'),
router          = express.Router(),
publicROUT      = require('./Public/index');

router.use('/public', publicROUT);

module.exports = router;