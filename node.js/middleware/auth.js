const jwt = require('jsonwebtoken')
const User = require('../models/user');
const { date } = require('zod');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token || token.length === 0){
            throw new Error('Token not found');
        }

        const decoded = jwt.verify(token, process.env.JWT_PROCESS);

        if(!decoded){
            throw new Error('Invalid token');
        }

        if(decoded.exp < Date.now() / 1000)
        {
            throw new Error('Token expired')
        }
        const user = await User.findOne({ _id: decoded.id});

        if(!user){
            throw new Error('User not found');
        }

        req.user = user;

        next();
    } catch (error) {
        
    }
}

module.exports = auth

//finish income (delete income)
//finish expense (add, get, update, delete)
//update user