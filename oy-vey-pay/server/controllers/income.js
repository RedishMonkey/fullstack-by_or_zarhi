const { z } = require('zod');
const User = require('../models/user');
const Income = require('../models/income');
const { userIdValidation } = require('../lib/validation/user')
const { incomeSchema, incomeIdValidation } = require('../lib/validation/income');
const income = require('../models/income');

const addIncome = async (req, res) => {
    try {

        if(req.user._id !== req.params.userId){
            return res.status(404).json({message: 'Forbiden'})
        }

        const userId = userIdValidation.parse(req.params.userId);
        const { title, description, amount, tag, currency } = incomeSchema.parse(req.body);

        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const income = new Income({
            title,
            description,
            amount,
            tag,
            currency,
        })
        
        await income.save();

        userExists.incomes.push(income)
        await userExists.save();

        return res.status(201).json({ message: 'Income added successfully' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Interval server error' })
    }
}

const getIncomes = async (req, res) => {
    try {
        
        if(req.user._id !== req.params.userId){
            return res.status(404).json({message: 'Forbiden'})
        }

        if(req.user._id !== req.params.userId){
            return res.status(404).json({message: 'Forbiden'})
        }

        const userId = userIdValidation.parse(req.params.userId);

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(5);
        const incomes = await Income.find({ _id: { $in: userExists.incomes } })
        
        return res.status(201).json(incomes);
    }
    catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Interval server error' })
    }
}

const updateIncome = async (req, res) => {
    try {

        if(req.user._id !== req.params.userId){
            return res.status(404).json({message: 'Forbiden'})
        }

        const userId = userIdValidation.parse(req.params.userId);
        const incomeId = incomeIdValidation.parse(req.params.incomeId);

        const { title, description, amount, tag, currency } = incomeSchema.parse(req.body);

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' })
        }


        if (!userExists.incomes.includes(incomeId)) {
            return res.status(404).json({ message: 'Income not found' })
        }

        const updatedIncome = await Income.findByIdAndUpdate(incomeId, {
            title,
            description,
            amount,
            tag,
            currency,
        })

        if(!updatedIncome)
        {
            return res.status(500).json({message: 'Update could not occur'})
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

const deleteIncome = async (req, res) => {
    try {

        if(req.user._id !== req.params.userId){
            return res.status(404).json({message: 'Forbiden'})
        }

        const userId = userIdValidation.parse(req.params.userId);
        const incomeId = incomeIdValidation.parse(req.params.incomeId);

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' })
        }


        if (!userExists.incomes.includes(incomeId)) {
            return res.status(404).json({ message: 'Income not found' })
        }

        
        const deleted = await Income.findByIdAndDelete(incomeId);
        if(!deleted){
            return res.status(404).json({ message: 'Income not found' })
        }

        userExists.incomes = userExists.incomes.filter(id => id.toString()!=incomeId);
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
    addIncome,
    getIncomes,
    updateIncome,
    deleteIncome,
}