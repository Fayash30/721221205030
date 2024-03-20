const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()

app.listen(process.env.PORT , ()=>{
    console.log("Server is Running...")
})

const rout = require('./Routes/routes')

app.use('',rout);

