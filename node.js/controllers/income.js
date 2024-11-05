const { z } = require('zod');
const User = require('../models/user');
const {} = require('../lib/validation/user')

const addIncome = async (req, res) => {
    try{
        const userId = req.params.userId;

        const userExists = await User.findById(userId);

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