const config = require('config');
const mongoose = require('mongoose')
const mongoUrl = config.get('mongoURL');

const connectDB = async() => {
    try{
        await mongoose.connect(mongoUrl);
        console.log("mongo connected")
        
    } catch(err) {
        console.log("server error")
    }
}

module.exports = connectDB;