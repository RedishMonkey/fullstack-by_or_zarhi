const User = require('../models/user');
const signUpSchema = require('../lib/validation/user');
const { z } = require('zod');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp =  async (req, res) => {
    try{
        const { fullName, username, email, password } = signUpSchema.parse(req.body);
        
        const usernameExists = await User.findOne({username});
        if(usernameExists)
        {
            return res.status(400).json({message: 'Username already exists'});
        }
        const emailExists = await User.findOne({username});
        if(emailExists)
        {
            return res.status(400).json({message: 'email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        })

        const newUser = await user.save()

        const token = jwt.sign({
            id: newUser._id,
            username: newUser.username,
        },process.env.JWT_SECRET,
        {expiresIn: '24h'})

        res.coockie('token',token,{
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24*60*60*1000, // 24 hours
        })

        res.status(201).json({message:'user created successfully'});
    }
    catch (error) {
        console.log(error);

        if(error instanceof z.ZodError)
        {
            return res.status(400).json({ message: error.errors[0].message })
        }

        return res.status(500).json({ message: 'Internal server error' })

    }
};

module.exports = {
    signUp
}

