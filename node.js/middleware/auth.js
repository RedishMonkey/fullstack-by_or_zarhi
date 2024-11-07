const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token || token.length === 0){
            throw new Error('Token not found');
        }

        const decoded  = jwt.verify(token, process.env.JWT_PROCESS);

        if(!decoded){
            throw new Error('Invalid token');
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

//finish income (delete income)
//finish expense (add, get, update, delete)
//update user