const mongo = require("mongoose")
require("dotenv").config()

const connectDb = async () => {
    try {
    mongo.connect("mongodb://localhost:27017/gestionBibliotheque");
        console.log("Connect DB success ");

    } catch (error) {
        console.log("errror :", error);

    }
}

module.exports = connectDb