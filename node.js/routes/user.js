const router = require('express').Router()
const {signUp, signIn, signOut, updateUser} = require('../controllers/user')
const auth = require('../middleware/auth')

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);
router.patch("/update-user/:userId", auth, updateUser);

module.exports = router;

// newbuer ofir newwwwwbuerrrr ofir ofir wofir ofir ofir ofir ofir ofir waswasdwasd