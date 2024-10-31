const router = require('express').Router()
const {signUp, signIn} = require('../controllers/user')

router.post("/sign-up", signUp);
router.post("/sign-up", signIn)

module.exports = router;
