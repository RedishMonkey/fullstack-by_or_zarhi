const router = require('express').Router()
const {getUsers,addUser, updateUser, deleteUser} = require('../controllers/user')

router.get('/get-users',getUsers);
router.post('/add-user', addUser);
router.patch('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);



module.exports = router