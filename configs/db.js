const mongo = require("mongoose")
require("dotenv").config()

const connectDb = async ()=>{
    try {
        mongo.connect(process.env.DB_URI);
        console.log("Connect DB success ");
        
    } catch (error) {
        console.log("errror :", error);
        
    }
}

module.exports = connectDb