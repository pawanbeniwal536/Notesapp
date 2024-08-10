const mongoose = require('mongoose');

const connection =()=>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("successfully connected to database")
    } catch (error) {
        console.log("Error in connecting to the database");
    }
} 

module.exports =connection;