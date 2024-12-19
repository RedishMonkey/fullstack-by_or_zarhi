const {addIncome, getIncomes, updateIncome, deleteIncome} = require('../controllers/income');
const router = require('express').Router();

router.post('/add-income/:userId', addIncome);
router.get('/get-incomes/:userId', getIncomes);
router.patch('/update-income/:userId/:incomeId', updateIncome);
router.delete('/delete-income/:userId/:incomeId', deleteIncome);

module.exports = router;