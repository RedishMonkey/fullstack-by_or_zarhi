const express = require('express');
const app = express();
const userRouter = require('./routes/user')
const connectDB = require('./lib/connect')

app.use(express.json());
app.use(userRouter)

console.log(process.env.DB_URL)

app.listen(3000, () => {
  connectDB();
  console.log('the server is running');
});




// const existingUser = users.find(user => user.name === name);
//   if (existingUser) {
//     return res.status(400).json({ error: 'name already exists' });
//   }
//   if (users.find(user => user.name === name)) {
//     return res.status(400).json({ error: 'name already exists' });
//   }




// // add delete 

// app.post('/add-user', (req,res) =>{
//   const {name} = req.body;
//   if(!name){
//     return res.status(400).json({error: 'name is required'});
//   }
//   const exist = users.find(user => user.name.includes(name));
//   if(exist){
//     return res.status(400).json({error: 'name already exist'});
//   }

//   const newUser = {
//     id: users.length+1,
//     name
//   };

//   users.push(newUser);
//   return(res.status(201).json(users));

// });

