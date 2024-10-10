const mongoose = require('mongoose');
const income = require('./income');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    incomes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Income',
        }
    ],
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense',
        }
    ],
},{timestamps: true})


module.exports= mongoose.model('User', userSchema);