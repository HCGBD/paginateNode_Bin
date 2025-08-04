const express = require('express')
const connectDb = require('./configs/db')
const PORT = process.env.PORT || 5000

const main  = async ()=>{
    const app  = express()
    connectDb()


    app.listen(PORT, () => {
        console.log(`Server start in http://127.0.0.1:${PORT}`);
        
    })

}

main()