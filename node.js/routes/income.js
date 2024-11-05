const {addIncome} = require('../controllers/income')
const router = require('express').router

router.post('/add-income/:userId', addIncome)