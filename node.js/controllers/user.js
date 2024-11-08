const User = require('../models/user');
const {signUpSchema, signInSchema} = require('../lib/validation/user');
const { z } = require('zod');
const bcrypt = require('bcrypt')
const {setTokenCookie} = require('../lib/validation/utils');


const signUp = async (req, res) => {
    try {
        const { fullName, username, email, password } = signUpSchema.parse(req.body);

        const usernameExists = await User.findOne({ username });
        console.log(1.1);
        if (usernameExists) {
            console.log(1.2)
            return res.status(400).json({ message: 'Username already exists' });
        }

        
        const emailExists = await User.findOne({ username });
        if (emailExists) {
            return res.status(400).json({ message: 'email already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        })


        const newUser = await user.save()

        if (!newUser) {
            return res.status(400).json({ message: 'failed to create user' })
        }

        setTokenCookie(res,newUser, process.env.JWT_SECRET)

        return res.status(201).json({ message: 'user created successfully' });
    }
    catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message })
        }

        return res.status(500).json({ message: 'Internal server error' })

    }
};

const signIn = async (req,res) => {
    try{
        const {username, password} = signInSchema.parse(req.body)
        
        const user = await User.findOne({username})
        
        if(!user)
        {
            return res.status(400).json({message:'invalid username or password'})
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch)
        {
            return res.status(400).json({message:'invalid username or password'})
        }
        setTokenCookie(res,user, process.env.JWT_SECRET)

        return res.status(200).json({message: "ok"})
    }
    catch (error) {
        console.log(error);

        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message })
        }

        return res.status(500).json({ message: 'Internal server error'})
    }
}

const signOut = async (req, res) => {
    try{
        res.clearCookie('token');
        return res.status(200).json({message: 'User signed out successfully'})        
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message: 'Interval server error'})
    }
} 

module.exports = {
    signUp,
    signIn,
    signOut,
}