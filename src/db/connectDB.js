const mongoose = require("mongoose");
require('dotenv').config()

const getConnectionString = ()=> {

    let connectionURL;


    if(process.env.NODE_ENV === 'development') {
        connectionURL = process.env.DATABASE_LOCAL
        connectionURL = connectionURL.replace('<username>', process.env.DATABASE_LOCAL_USERNAME)
        connectionURL = connectionURL.replace('<password>', process.env.DATABASE_LOCAL_PASSWORD)
    }
    else {
        connectionURL = process.env.DATABASE_PRODUCTION
    }
    return connectionURL


}

const connectDB = async () => {
    console.log("connecting to database");
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.35itrev.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {dbName: process.env.DB_NAME})
    console.log("connected to database");
}

module.exports = connectDB;