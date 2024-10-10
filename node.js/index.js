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