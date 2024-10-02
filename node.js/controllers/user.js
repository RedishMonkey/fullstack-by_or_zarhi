// const users = [{id:1, name:"itay"}]
const User = require('../models/user')


const getUsers = (req, res) => {  
    usersArr = JSON.stringify(users)
    res.send(usersArr);
  }

const addUser = async (req, res) => {
    // const {name} = req.body;
    // if (!name) {
    //   return res.status(400).json({ error: 'name is required' });
    // }
    // const newUser = {id:users.length + 1, name:name}
    // users.push(newUser);
    // res.send("user added")

    const {name, username} = req.body;
    const user = new User({name,username});
    console.log('created user')
    await user.save();
    console.log('saved user')
    return res.status(201).send({name, username})

  }

const updateUser = (req, res) => {
    const {id} = req.params 
    const {name} = req.body;
    
    if(!id)
    {
        res.status(400).send('id doesnt exist');
    }
    if(!name)
    {
        res.status(400).send('name doesnt exist');
    }

    userIndex = users.findIndex(user => user.id == id);
    if(userIndex==-1)
    {
        res.send('user doesnt exist')
    }
    users[userIndex].name = name
    res.send('user updated')
}

const deleteUser = (req,res) => {
    const {id} = req.params

    if(!id)
    {
        res.status(400).send('did not get id')
    }
    userIndex = users.findIndex(user => user.id == id);
    if(id == -1)
    {
        res.status(400).send('user doesnt exist');
    }

    users.splice(userIndex,1);
    res.send('user deleted');
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}