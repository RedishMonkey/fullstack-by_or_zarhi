const express = require('express');
const app = express();
const routes = require('./routes/index')
const connectDB = require('./lib/connect')
const bcrypt = require('bcrypt')


app.use(express.json());
app.use(routes)

console.log(process.env.DB_URL)

app.listen(3000, () => {
  connectDB();
  console.log('the server is running');
});