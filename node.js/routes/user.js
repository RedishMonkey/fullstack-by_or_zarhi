const router = require('express').Router()
const { signUp} = require('../controllers/user')

router.post("/sign-up", signUp);


module.exports = router
