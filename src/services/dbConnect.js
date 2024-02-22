const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connect = async () => {
    
    try {
        await mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true});

        console.log('MongoDB connected')
    }catch(e) {
        console.log('We have an error with the DB ->', e)
    }

    mongoose.connection.on("disconnected", () => {
        console.log("mongoDB disconnected!");
    });
}

module.exports = { connect }