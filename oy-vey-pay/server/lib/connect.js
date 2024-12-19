const mongoose = require('mongoose');

const connectDB =  () => {
    mongoose.connect(process.env.DB_URL);
    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log('database connction error: ', error);
    });
    database.once('open', ()=>{
        console.log('connected to the database');
    })
}

module.exports = connectDB
