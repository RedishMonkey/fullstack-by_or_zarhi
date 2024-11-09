const { z } = require('zod');
const User = require('../models/user');
const Expense = require('../models/expense');
const { userIdValidation } = require('../lib/validation/user')
const { expenseSchema, expenseIdValidation } = require('../lib/validation/expense');
const expense = require('../models/expense');

const addExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const { title, description, amount, tag, currency } = expenseSchema.parse(req.body);

        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const expense = new Expense({
            title,
            description,
            amount,
            tag,
            currency,
        })
        
        await expense.save();

        userExists.expenses.push(expense)
        await userExists.save();

        return res.status(201).json({ message: 'expense added successfully' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Interval server error' })
    }
}

const getExpenses = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const expenses = await Expense.find({ _id: { $in: userExists.expenses } })
        
        return res.status(201).json(expenses);
    }
    catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Interval server error' })
    }
}

const updateExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const expenseId = expenseIdValidation.parse(req.params.expenseId);

        const { title, description, amount, tag, currency } = expenseSchema.parse(req.body);

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' })
        }


        if (!userExists.expenses.includes(expenseId)) {
            return res.status(404).json({ message: 'expense not found' })
        }

        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
            title,
            description,
            amount,
            tag,
            currency,
        })

        if(!updatedExpense)
        {
            return res.status(404).json({message: 'expense not found'})
        }
        return res.status(200).json({message: "ok"});

    } catch (error) {
        console.log(error)

        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }

        return res.status(500).json({ message: 'Interval server error' })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const expenseId = expenseIdValidation.parse(req.params.expenseId);

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' })
        }


        if (!userExists.expenses.includes(expenseId)) {
            return res.status(404).json({ message: 'expense not found' })
        }

        
        await expense.findByIdAndDelete(expenseId);
        userExists.expenses = await userExists.expenses.filter(id => id.toString()!=expenseId);
        await userExists.save();

        return res.status(200).json({message: "ok"});
    } catch (error) {
        console.log(error);

        if(z instanceof z.ZodError)
        {
            return res.status(400).json({ message: error.errors[0].message });
        }

        return res.status(500).json({ message: 'Interval server error' });
        
    }
}




module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
}