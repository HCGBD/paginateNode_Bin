const express = require('express')
const connectDb = require('./configs/db')
const AutheursRoutes  = require("./routes/AutheursRoutes")
const PORT = process.env.PORT || 5000

const main  = async ()=>{
    const app  = express()
    connectDb()

    app.use(express.json())
    app.use("/auteurs",AutheursRoutes)


    app.listen(PORT, () => {
        console.log(`Server start in http://127.0.0.1:${PORT}`);
        
    })

}

main()