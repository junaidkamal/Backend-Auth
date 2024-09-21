require("dotenv").config();
const mongoose = require('mongoose')


const { MONGO_URI } = process.env;

const connectToDB = async () => {
 try{
    await mongoose.connect(MONGO_URI, );
    } catch(err){

    }
 }


connectToDB();