const router = require('express').Router()
const { sighUp} = require('../controllers/user')

router.post("/sign-up", sighUp);


module.exports = router
