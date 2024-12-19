const express = require('express');
const app = express();
const routes = require('./routes/index')
const connectDB = require('./lib/connect')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(routes)
app.use(cookieParser())

console.log(process.env.DB_URL)

app.listen(3000, () => {
  connectDB();
  console.log('the server is running');
});