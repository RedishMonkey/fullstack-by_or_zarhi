const {addIncome, getIncomes, updateIncome} = require('../controllers/income');
const router = require('express').Router();

router.post('/add-income/:userId', addIncome);
router.get('/get-incomes/:userId', getIncomes);
router.patch('/update-income/:userId/:incomeId,', updateIncome);

module.exports = router;