const { route } = require('./income');

const router = require('express').Router()

router.use(require('./income'));
router.use(require('./user'));
router.use(require('./expense'));

module.exports = router;