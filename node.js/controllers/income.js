const { z } = require('zod');
const User = require('../models/user');
const Income = require('../models/income');
const { userIdValidation } = require('../lib/validation/user')
const { incomeSchema } = require('../lib/validation/income');
const income = require('../models/income');

const addIncome = async (req, res) => {
    try{
        const userId = userIdValidation(req.params.userId);
        const {title, description, amount, tag, currency} = incomeSchema.parse(req.body);

        const userExists = await User.findById(userId);
        if(!userExists)
        {
            return res.status(404).json({ message: 'User not found'});
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

        return res.status(201).json({message: 'Income added successfully'});
    }
    catch(error){
        console.log(error);
        if(error instanceof z.ZodError){
            return res.status(400).json({message: error.errors[0].message});
        }
        return res.status(500).json({message: 'Interval server error'})
    }
}

module.exports = {
    addIncome,
}