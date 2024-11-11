const User = require('../models/user');
const {signUpSchema, signInSchema, userIdValidation, updateUserSchema} = require('../lib/validation/user');
const { z } = require('zod');
const bcrypt = require('bcrypt')
const {setTokenCookie} = require('../lib/validation/utils');


const signUp = async (req, res) => {
    try {
        const { fullName, username, email, password } = signUpSchema.parse(req.body);

        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        
        const emailExists = await User.findOne({ email });
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

const updateUser = async (req, res) => {
    try{
        userId = userIdValidation.parse(req.params.userId);
        const userExists = await User.findOne({_id:userId})
        if(!userId){
            return res.status(404).json({message: "User not found"})
        }


        // default value for password is 123456789 because password is hashed and there is no way to know the original one and is only temporary because it is then set
        const {fullName=userExists.fullName, email=userExists.email, password="passowrd not given"} = updateUserSchema.parse(req.body); 


        
        const emailExists = await User.findOne({ email });
        if (emailExists && emailExists.email != userExists.email) {
            return res.status(400).json({ message: 'email already exists', emails:[emailExists.email, userExists.email, fullName, password]});
        }


        
        let hashedPassword = await bcrypt.hash(password, 10);

        const isDefaultPassword = password == "passowrd not given" //checks if a new password was given in the body
        console.log("password: ", password)

        if(isDefaultPassword){
            hashedPassword = userExists.password
        }

        console.log("hashed password: ", hashedPassword)
        console.log("current password: ", userExists.password)


        const updatedUser = await User.findByIdAndUpdate(userId, {
            fullName, 
            email, 
            password: hashedPassword,
        })


        if(!updatedUser){
            return res.status(404).json({message: 'Income not found'})
        }
        
        return res.status(200).json({message: "ok"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Interval server error'})
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    updateUser,
}